"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole, Paperclip, Phone, Siren, X } from "lucide-react";
import type { z } from "zod";
import { company } from "@/content/home";
import { devis as t } from "@/content/devis";
import { POLE_IDS, POLE_LIST, type PoleId } from "@/lib/poles";
import { besoinSchema, contactSchema, flattenErrors, isUrgent, poleSchemas, projetSchema } from "@/lib/devis/schema";
import { FILE_LIMITS } from "@/lib/devis/limits";
import { submitQuote, type QuoteState } from "@/app/devis/actions";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { PoleIcon } from "@/components/ui/PoleIcon";
import { Checkbox, ChoiceGroup, fieldId, TextField } from "./fields";
import { Turnstile } from "./Turnstile";

// ---------- État du formulaire ----------
const initial = {
  besoin: { poles: [] as PoleId[], profil: "", nature: "" },
  informatique: { domaines: [] as string[], utilisateurs: "", outils: [] as string[], situation: "", contraintes: "" },
  construction: { typeOuvrage: "", travaux: "", surface: "", avancement: "", equipements: [] as string[] },
  hydraulique: { besoins: [] as string[], contexte: "", probleme: "", ampleur: "", plans: "" },
  maintenance: { domaines: [] as string[], formule: "", equipements: "", nombre: "", criticite: "" },
  projet: { localisation: "", delai: "", budget: "", description: "" },
  contact: { nom: "", entreprise: "", fonction: "", telephone: "", whatsapp: false, email: "", preference: "", consentement: false },
};
type Data = typeof initial;
type Errors = Record<string, string>;

const STEP_OF = (key: string) =>
  key.startsWith("besoin") ? 0 : key.startsWith("projet") ? 2 : key.startsWith("contact") ? 3 : 1;

function validate(schema: z.ZodType, value: unknown, prefix: string): Errors {
  const r = schema.safeParse(value);
  if (r.success) return {};
  const flat = flattenErrors(r.error);
  return Object.fromEntries(Object.entries(flat).map(([k, v]) => [`${prefix}.${k}`, v]));
}

export function QuoteForm() {
  const [data, setData] = useState<Data>(initial);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>();
  const [token, setToken] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState<QuoteState, FormData>(submitQuote, { status: "idle" });
  const headingRef = useRef<HTMLHeadingElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  // Pré-sélection d'un pôle depuis l'URL (/devis?pole=hydraulique), lue hors du rendu.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("pole");
    if (p && (POLE_IDS as readonly string[]).includes(p)) {
      const f = requestAnimationFrame(() => setData((d) => ({ ...d, besoin: { ...d.besoin, poles: [p as PoleId] } })));
      return () => cancelAnimationFrame(f);
    }
  }, []);

  // À chaque changement d'étape, le focus va au titre : le lecteur d'écran annonce la nouvelle étape.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [step, state.status]);

  // Erreurs renvoyées par le serveur : on revient à l'étape concernée.
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    const fe = state.fieldErrors;
    const f = requestAnimationFrame(() => {
      setErrors(fe);
      const keys = Object.keys(fe);
      if (keys.length) setStep(Math.min(...keys.map(STEP_OF)));
    });
    return () => cancelAnimationFrame(f);
  }, [state]);

  const set = <S extends keyof Data, K extends keyof Data[S]>(section: S, key: K, value: Data[S][K]) => {
    setData((d) => ({ ...d, [section]: { ...d[section], [key]: value } }));
    const path = `${String(section)}.${String(key)}`;
    if (errors[path])
      setErrors((prev) => {
        const next = { ...prev };
        delete next[path];
        return next;
      });
  };
  const err = (path: string) => errors[path];

  const stepErrors = (s: number): Errors => {
    if (s === 0) return validate(besoinSchema, data.besoin, "besoin");
    if (s === 1) return Object.assign({}, ...data.besoin.poles.map((p) => validate(poleSchemas[p], data[p], p)));
    if (s === 2) return validate(projetSchema, data.projet, "projet");
    const e = validate(contactSchema, data.contact, "contact");
    if (data.besoin.profil !== "particulier" && !data.contact.entreprise.trim()) e["contact.entreprise"] = t.errors.required;
    return e;
  };

  const goNext = () => {
    const e = stepErrors(step);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(fieldId(first))?.focus();
      return false;
    }
    return true;
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files, ...Array.from(list)];
    const total = next.reduce((s, f) => s + f.size, 0);
    if (next.length > FILE_LIMITS.maxFiles) return setFileError(`${FILE_LIMITS.maxFiles} fichiers maximum.`);
    if (total > FILE_LIMITS.maxTotalBytes) return setFileError("10 Mo au total maximum.");
    setFileError(undefined);
    setFiles(next);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      if (goNext()) setStep(step + 1);
      return;
    }
    if (!goNext()) return;
    const payload: Record<string, unknown> = { besoin: data.besoin, projet: data.projet, contact: data.contact };
    for (const p of data.besoin.poles) payload[p] = data[p];
    const fd = new FormData();
    fd.set("payload", JSON.stringify(payload));
    fd.set("website", honeypot.current?.value ?? "");
    if (token) fd.set("cf-turnstile-response", token);
    files.forEach((f) => fd.append("fichiers", f));
    startTransition(() => formAction(fd));
  };

  // ---------- Confirmation ----------
  if (state.status === "success") {
    return (
      <div className="glass rounded-(--radius-card) p-8 text-center sm:p-12" role="status">
        <CheckCircle2 size={48} aria-hidden="true" className="mx-auto text-electric" />
        <h2 ref={headingRef} tabIndex={-1} className="mt-5 text-3xl font-bold outline-none">{t.success.title}</h2>
        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-ink-muted">{t.success.reference}</p>
        <p className="mt-2 font-display text-2xl font-bold tracking-wider text-orange">{state.reference}</p>
        <p className="mx-auto mt-6 max-w-lg text-ink-muted">{t.success.text}</p>
        {state.urgent && (
          <p className="mx-auto mt-6 max-w-lg rounded-xl border border-orange/40 bg-orange/10 p-4 text-sm">
            {t.poles.emergency.text}{" "}
            <a href={company.emergencyPhoneHref} className="font-semibold text-orange underline">{company.phoneDisplay}</a>
          </p>
        )}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={t.success.ctaProjects.href}>{t.success.ctaProjects.label}</Button>
          <Button href={t.success.ctaHome.href} variant="secondary">{t.success.ctaHome.label}</Button>
        </div>
      </div>
    );
  }

  const urgent = step === 1 && isUrgent({ maintenance: data.besoin.poles.includes("maintenance") ? data.maintenance : undefined, informatique: data.besoin.poles.includes("informatique") ? data.informatique : undefined });
  const errorCount = Object.keys(errors).length;

  return (
    <form onSubmit={submit} noValidate className="glass rounded-(--radius-card) p-6 sm:p-10">
      {/* Progression */}
      <div className="mb-8">
        <p className="text-sm font-medium text-electric-soft">{t.progress(step + 1, t.steps.length)}</p>
        <ol className="mt-3 grid grid-cols-4 gap-2" aria-label="Étapes">
          {t.steps.map((label, i) => (
            <li key={label} aria-current={i === step ? "step" : undefined}>
              <span className={cn("block h-1.5 rounded-full", i <= step ? "bg-electric" : "bg-line")} />
              <span className={cn("mt-2 hidden text-xs sm:block", i === step ? "text-ink" : "text-ink-muted")}>{label}</span>
            </li>
          ))}
        </ol>
      </div>

      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold outline-none sm:text-3xl">
        {[t.besoin.title, t.poles.title, t.projet.title, t.contact.title][step]}
      </h2>

      {(errorCount > 0 || state.status === "error") && (
        <p role="alert" className="mt-5 rounded-xl border border-orange/40 bg-orange/10 px-4 py-3 text-sm">
          {state.status === "error" && !errorCount ? state.message : t.errors.invalid}
        </p>
      )}

      <div className="mt-8 space-y-8">
        {/* Étape 1 */}
        {step === 0 && (
          <>
            <fieldset id={fieldId("besoin.poles")} tabIndex={-1} className="outline-none" aria-describedby={err("besoin.poles") ? `${fieldId("besoin.poles")}-error` : undefined}>
              <legend className="text-base font-semibold">{t.besoin.polesLabel}</legend>
              <p className="mt-1.5 text-sm text-ink-muted">{t.besoin.polesHelp}</p>
              <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {POLE_LIST.map((pole) => {
                  const checked = data.besoin.poles.includes(pole.id);
                  return (
                    <label
                      key={pole.id}
                      className={cn(
                        "group flex cursor-pointer flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-colors",
                        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-electric",
                        checked ? "border-electric bg-electric/12" : "border-line bg-surface-2 hover:border-electric/50",
                      )}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => set("besoin", "poles", checked ? data.besoin.poles.filter((p) => p !== pole.id) : [...data.besoin.poles, pole.id])}
                      />
                      <PoleIcon pole={pole.id} size="lg" className="self-center" />
                      <span className="font-display font-semibold">{pole.label}</span>
                    </label>
                  );
                })}
              </div>
              {err("besoin.poles") && <p id={`${fieldId("besoin.poles")}-error`} className="mt-1.5 text-sm font-medium text-orange">{err("besoin.poles")}</p>}
            </fieldset>
            <ChoiceGroup path="besoin.profil" legend={t.besoin.profilLabel} options={t.besoin.profil} columns={3} value={data.besoin.profil} onChange={(v) => set("besoin", "profil", v)} error={err("besoin.profil")} />
            <ChoiceGroup path="besoin.nature" legend={t.besoin.natureLabel} options={t.besoin.nature} columns={4} value={data.besoin.nature} onChange={(v) => set("besoin", "nature", v)} error={err("besoin.nature")} />
          </>
        )}

        {/* Étape 2 : uniquement les pôles choisis */}
        {step === 1 && (
          <>
            {urgent && (
              <div role="alert" className="flex flex-col gap-4 rounded-2xl border border-orange/50 bg-orange/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                  <Siren aria-hidden="true" className="mt-0.5 shrink-0 text-orange" />
                  <div>
                    <p className="font-semibold">{t.poles.emergency.title}</p>
                    <p className="mt-1 text-sm text-ink-muted">{t.poles.emergency.text}</p>
                  </div>
                </div>
                <Button href={company.emergencyPhoneHref} icon={<Phone size={16} />} className="shrink-0">
                  {t.poles.emergency.cta}
                </Button>
              </div>
            )}
            {data.besoin.poles.map((pole) => (
              <section key={pole} aria-labelledby={`sec-${pole}`} className="space-y-6 border-t border-line pt-8 first:border-t-0 first:pt-0">
                <h3 id={`sec-${pole}`} className="flex items-center gap-3 text-xl font-semibold">
                  <PoleIcon pole={pole} size="sm" />
                  {POLE_LIST.find((p) => p.id === pole)!.label}
                </h3>
                <PoleQuestions pole={pole} data={data} set={set} err={err} />
              </section>
            ))}
          </>
        )}

        {/* Étape 3 */}
        {step === 2 && (
          <>
            <TextField path="projet.localisation" label={t.projet.localisation.label} help={t.projet.localisation.help} value={data.projet.localisation} onChange={(v) => set("projet", "localisation", v)} error={err("projet.localisation")} maxLength={120} autoComplete="address-level2" required />
            <ChoiceGroup path="projet.delai" legend={t.projet.delai.label} options={t.projet.delai.options} columns={3} value={data.projet.delai} onChange={(v) => set("projet", "delai", v)} error={err("projet.delai")} />
            <ChoiceGroup path="projet.budget" legend={t.projet.budget.label} options={t.projet.budget.options} columns={3} value={data.projet.budget} onChange={(v) => set("projet", "budget", v)} error={err("projet.budget")} />
            <TextField path="projet.description" label={t.projet.description.label} help={t.projet.description.help} value={data.projet.description} onChange={(v) => set("projet", "description", v)} error={err("projet.description")} multiline maxLength={3000} required />
            <div>
              <p className="text-base font-semibold">{t.projet.fichiers.label}</p>
              <p id="fichiers-help" className="mt-1.5 text-sm text-ink-muted">{t.projet.fichiers.help}</p>
              <label className="mt-3 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-electric/60 px-5 text-sm font-semibold hover:bg-electric/10 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-electric">
                <Paperclip size={16} aria-hidden="true" />
                Ajouter des fichiers
                <input type="file" multiple accept={FILE_LIMITS.accept} className="sr-only" aria-describedby="fichiers-help" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
              </label>
              {files.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {files.map((f, i) => (
                    <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-2 px-4 py-2 text-sm">
                      <span className="truncate">{f.name} <span className="text-ink-muted">({(f.size / 1024 / 1024).toFixed(1)} Mo)</span></span>
                      <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-white/10" aria-label={`${t.projet.fichiers.remove} ${f.name}`}>
                        <X size={16} aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {(fileError || err("projet.fichiers")) && <p className="mt-1.5 text-sm font-medium text-orange">{fileError ?? err("projet.fichiers")}</p>}
            </div>
          </>
        )}

        {/* Étape 4 */}
        {step === 3 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField path="contact.nom" label={t.contact.nom.label} value={data.contact.nom} onChange={(v) => set("contact", "nom", v)} error={err("contact.nom")} autoComplete="name" maxLength={100} required />
              {data.besoin.profil !== "particulier" && (
                <TextField path="contact.entreprise" label={t.contact.entreprise.label} value={data.contact.entreprise} onChange={(v) => set("contact", "entreprise", v)} error={err("contact.entreprise")} autoComplete="organization" maxLength={120} required />
              )}
              <TextField path="contact.fonction" label={t.contact.fonction.label} value={data.contact.fonction} onChange={(v) => set("contact", "fonction", v)} error={err("contact.fonction")} autoComplete="organization-title" maxLength={100} />
              <TextField path="contact.telephone" label={t.contact.telephone.label} help={t.contact.telephone.help} type="tel" inputMode="tel" value={data.contact.telephone} onChange={(v) => set("contact", "telephone", v)} error={err("contact.telephone")} autoComplete="tel" maxLength={25} required />
              <TextField path="contact.email" label={t.contact.email.label} type="email" inputMode="email" value={data.contact.email} onChange={(v) => set("contact", "email", v)} error={err("contact.email")} autoComplete="email" maxLength={160} required />
            </div>
            <Checkbox path="contact.whatsapp" label={t.contact.whatsapp.label} checked={data.contact.whatsapp} onChange={(v) => set("contact", "whatsapp", v)} />
            <ChoiceGroup path="contact.preference" legend={t.contact.preference.label} options={t.contact.preference.options} columns={3} value={data.contact.preference} onChange={(v) => set("contact", "preference", v)} error={err("contact.preference")} />
            <Checkbox
              path="contact.consentement"
              checked={data.contact.consentement}
              onChange={(v) => set("contact", "consentement", v)}
              error={err("contact.consentement")}
              label={<>{t.contact.consentement.label}{" "}<a href={t.contact.consentement.link.href} className="text-electric-soft underline underline-offset-2">{t.contact.consentement.link.label}</a></>}
            />
            <Turnstile onToken={setToken} />
          </>
        )}
      </div>

      {/* Champ piège anti-robot : masqué aux humains et aux lecteurs d'écran */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Site web<input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <Button variant="ghost" icon={<ArrowLeft size={16} />} onClick={() => { setErrors({}); setStep(step - 1); }}>
            {t.nav.back}
          </Button>
        ) : <span />}
        {step < 3 ? (
          <Button type="submit" size="lg" icon={<ArrowRight size={18} />} iconPosition="end">{t.nav.next}</Button>
        ) : (
          <Button type="submit" size="lg" icon={<LockKeyhole size={18} />} disabled={pending} aria-busy={pending}>
            {pending ? t.nav.sending : t.nav.submit}
          </Button>
        )}
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
        <LockKeyhole size={14} aria-hidden="true" />
        {t.intro.security}
      </p>
    </form>
  );
}

// ---------- Questions par pôle ----------
type SetFn = <S extends keyof Data, K extends keyof Data[S]>(section: S, key: K, value: Data[S][K]) => void;

function PoleQuestions({ pole, data, set, err }: { pole: PoleId; data: Data; set: SetFn; err: (p: string) => string | undefined }) {
  const q = t.poles;
  if (pole === "informatique") {
    const d = data.informatique, o = q.informatique;
    return (
      <>
        <ChoiceGroup multiple path="informatique.domaines" legend={o.domaines.label} options={o.domaines.options} value={d.domaines} onChange={(v) => set("informatique", "domaines", v)} error={err("informatique.domaines")} />
        <ChoiceGroup path="informatique.utilisateurs" legend={o.utilisateurs.label} options={o.utilisateurs.options} columns={4} value={d.utilisateurs} onChange={(v) => set("informatique", "utilisateurs", v)} error={err("informatique.utilisateurs")} />
        <ChoiceGroup multiple path="informatique.outils" legend={o.outils.label} options={o.outils.options} columns={4} value={d.outils} onChange={(v) => set("informatique", "outils", v)} error={err("informatique.outils")} />
        <ChoiceGroup path="informatique.situation" legend={o.situation.label} options={o.situation.options} columns={3} value={d.situation} onChange={(v) => set("informatique", "situation", v)} error={err("informatique.situation")} />
        <TextField path="informatique.contraintes" label={o.contraintes.label} help={o.contraintes.help} value={d.contraintes} onChange={(v) => set("informatique", "contraintes", v)} error={err("informatique.contraintes")} maxLength={300} />
      </>
    );
  }
  if (pole === "construction") {
    const d = data.construction, o = q.construction;
    return (
      <>
        <ChoiceGroup path="construction.typeOuvrage" legend={o.typeOuvrage.label} options={o.typeOuvrage.options} columns={3} value={d.typeOuvrage} onChange={(v) => set("construction", "typeOuvrage", v)} error={err("construction.typeOuvrage")} />
        <ChoiceGroup path="construction.travaux" legend={o.travaux.label} options={o.travaux.options} columns={4} value={d.travaux} onChange={(v) => set("construction", "travaux", v)} error={err("construction.travaux")} />
        <TextField path="construction.surface" label={o.surface.label} inputMode="decimal" value={d.surface} onChange={(v) => set("construction", "surface", v)} error={err("construction.surface")} maxLength={10} />
        <ChoiceGroup path="construction.avancement" legend={o.avancement.label} options={o.avancement.options} columns={4} value={d.avancement} onChange={(v) => set("construction", "avancement", v)} error={err("construction.avancement")} />
        <ChoiceGroup multiple path="construction.equipements" legend={o.equipements.label} options={o.equipements.options} columns={3} value={d.equipements} onChange={(v) => set("construction", "equipements", v)} error={err("construction.equipements")} />
      </>
    );
  }
  if (pole === "hydraulique") {
    const d = data.hydraulique, o = q.hydraulique;
    return (
      <>
        <ChoiceGroup multiple path="hydraulique.besoins" legend={o.besoins.label} options={o.besoins.options} value={d.besoins} onChange={(v) => set("hydraulique", "besoins", v)} error={err("hydraulique.besoins")} />
        <ChoiceGroup path="hydraulique.contexte" legend={o.contexte.label} options={o.contexte.options} columns={3} value={d.contexte} onChange={(v) => set("hydraulique", "contexte", v)} error={err("hydraulique.contexte")} />
        <ChoiceGroup path="hydraulique.probleme" legend={o.probleme.label} options={o.probleme.options} columns={3} value={d.probleme} onChange={(v) => set("hydraulique", "probleme", v)} error={err("hydraulique.probleme")} />
        <TextField path="hydraulique.ampleur" label={o.ampleur.label} help={o.ampleur.help} value={d.ampleur} onChange={(v) => set("hydraulique", "ampleur", v)} error={err("hydraulique.ampleur")} maxLength={200} />
        <ChoiceGroup path="hydraulique.plans" legend={o.plans.label} help={d.plans === "oui" ? o.plans.hintIfYes : undefined} options={o.plans.options} columns={2} value={d.plans} onChange={(v) => set("hydraulique", "plans", v)} error={err("hydraulique.plans")} />
      </>
    );
  }
  const d = data.maintenance, o = q.maintenance;
  return (
    <>
      <ChoiceGroup multiple path="maintenance.domaines" legend={o.domaines.label} options={o.domaines.options} columns={3} value={d.domaines} onChange={(v) => set("maintenance", "domaines", v)} error={err("maintenance.domaines")} />
      <ChoiceGroup path="maintenance.formule" legend={o.formule.label} options={o.formule.options} columns={3} value={d.formule} onChange={(v) => set("maintenance", "formule", v)} error={err("maintenance.formule")} />
      <TextField path="maintenance.equipements" label={o.equipements.label} help={o.equipements.help} value={d.equipements} onChange={(v) => set("maintenance", "equipements", v)} error={err("maintenance.equipements")} maxLength={300} />
      <TextField path="maintenance.nombre" label={o.nombre.label} inputMode="numeric" value={d.nombre} onChange={(v) => set("maintenance", "nombre", v)} error={err("maintenance.nombre")} maxLength={6} />
      <ChoiceGroup path="maintenance.criticite" legend={o.criticite.label} options={o.criticite.options} columns={3} value={d.criticite} onChange={(v) => set("maintenance", "criticite", v)} error={err("maintenance.criticite")} />
    </>
  );
}
