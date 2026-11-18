// Everything the CV says, in English, French and Arabic. The components only lay it out.
// Technical names (Quarkus, Kafka Streams, …) and certification titles stay as they are.

export type Lang = 'en' | 'fr' | 'ar';

export interface SubRole {
  title:  string;
  period: string;
  tasks:  string[];
}

export interface Experience {
  company:   string;
  /** Two letters on the badge when there is no logo. */
  monogram:  string;
  /** The employer's logo, under public/logos. */
  logo?:     string;
  location:  string;
  period:    string;
  /** The job being done now. */
  current?:  boolean;
  role:      string;
  type:      string;
  project?:  string;
  subRoles?: SubRole[];
  tasks?:    string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Degree {
  title:       string;
  institution: string;
  location:    string;
  period:      string;
}

export interface Certification {
  title:  string;
  issuer: string;
  url:    string;
}

export interface CreativeWork {
  /** Its page: /works/<slug>. */
  slug:        string;
  title:       string;
  year:        string;
  context:     string;
  description: string;
  /** The page's technical write-up (one string per paragraph) and diagram; empty until written. */
  details?: {
    paragraphs: string[];
    /** Image under public/, e.g. "works/jqcd.svg". */
    diagram?:   string;
    diagramAlt?: string;
  };
}

export interface CefrSkills {
  listening?:         string;
  reading?:           string;
  writing?:           string;
  spokenProduction?:  string;
  spokenInteraction?: string;
}

export interface Language {
  name:          string;
  motherTongue?: boolean;
  skills?:       CefrSkills;
}

/** An AI tool and how far I go with it. "top" marks the highest level, drawn stronger. */
export interface AiSkill {
  tool:   string;
  vendor: string;
  level:  string;
  /** Its logo, under public/logos. */
  logo:   string;
  top?:   boolean;
}

/** The About section: a short story in three beats, then the two "schools" as tags. */
export interface Intro {
  /** Beat one: the old-school craft. */
  lead:      string;
  /** Beat two: the twist, set large. */
  twist:     string;
  /** Beat three: the agentic architect. */
  body:      string;
  /** What I am building right now, shown as a live callout. */
  lab:       { label: string; text: string };
  /** Where and with what, in one line. */
  context:   string;
  oldSchool: { label: string; items: string[] };
  newSchool: { label: string; items: string[] };
}

export interface CvContent {
  /** The name of this language in itself, for the switcher. */
  label:     string;
  pageTitle: string;
  ui: {
    aiSkills: string; about: string; experience: string; skills: string; education: string; creative: string; languages: string;
    degrees: string; certifications: string; verify: string;
    current: string; currently: string; at: string; native: string;
    years: string; companies: string; certs: string;
    downloadCv: string; filesNote: string;
    details: string; backToCv: string; technicalDescription: string; diagram: string; comingSoon: string;
    zoomIn: string; zoomOut: string; resetZoom: string; openDiagram: string; close: string; notFound: string;
    printTitle: string; lightMode: string; darkMode: string; toLight: string; toDark: string; language: string;
    cefr: Record<keyof CefrSkills, string>;
  };
  hero: {
    name: string; title: string; role: string;
    location: string; workPermit: string;
    /** "{age}" is replaced by the age today. */
    born: string;
  };
  about:          Intro;
  aiSkills:       AiSkill[];
  experiences:    Experience[];
  skillGroups:    SkillGroup[];
  degrees:        Degree[];
  certifications: Certification[];
  works:          CreativeWork[];
  languages:      Language[];
}

// ── Shared: the same in every language ─────────────────────────────────────────
const SKILLS = {
  languages:    ['Java 8–17', 'Java EE', 'Spring Core', 'Spring Boot', 'Spring MVC', 'Spring Security', 'Spring Data', 'Spring AOP',
                 'Quarkus', 'Kafka Streams', 'Keycloak', 'Angular', 'TypeScript', 'JavaScript', 'jQuery', 'NodeJS', 'ExpressJS',
                 'RESTful API', 'SOAP', 'HTML5', 'CSS', 'JSON', 'XML', 'WSDL', 'XSD', 'XPDL'],
  databases:    ['Oracle', 'PostgreSQL', 'Redis', 'ElasticSearch'],
  architecture: ['Microservices', 'Microfrontends', 'MVC', 'Semi-monolithic', 'Monolithic'],
  patterns:     ['Chassis Design', 'CQRS', 'SAGA', 'Event Sourcing'],
  devops:       ['Docker', 'Kubernetes', 'OpenShift', 'GitHub Actions', 'Jenkins', 'Grafana', 'Kibana', 'Splunk', 'Rundeck', 'XLDeploy', 'XL Release', 'Containerization'],
  practices:    ['BDD', 'TDD', 'Agile', 'Scrum', 'Functional Reactive Programming'],
  build:        ['Maven', 'NPM', 'Yarn', 'Composer', 'Nexus', 'JFrog Artifactory'],
  versioning:   ['Git', 'SVN'],
  tools:        ['IntelliJ IDEA', 'DataGrip', 'Oracle SQL Developer', 'PL/SQL', 'JBoss 6 & 7', 'Tomcat', 'Swagger / OpenAPI', 'Postman', 'SoapUI', 'MINIO',
                 'Jira', 'Confluence', 'Azure DevOps', 'Apache POI'],
};
type SkillKey = keyof typeof SKILLS;

const skillGroups = (labels: Record<SkillKey, string>): SkillGroup[] =>
  (Object.keys(SKILLS) as SkillKey[]).map((key) => ({ label: labels[key], items: SKILLS[key] }));

const CERTIFICATIONS = (issuerScrum: string): Certification[] => [
  { title: 'Certified Professional Scrum Master', issuer: issuerScrum, url: 'https://www.credly.com/badges/04c0ebab-60b6-4bba-954a-2abe473b0e1c' },
  { title: 'Oracle Certified Professional: Java SE 11 Developer', issuer: 'Oracle', url: 'https://www.credly.com/badges/d0827170-6e2a-47d1-b7c1-a41ff100fec7' },
];

const ENGLISH_SKILLS: CefrSkills = { listening: 'C1', reading: 'C1', writing: 'C1', spokenProduction: 'B2', spokenInteraction: 'C1' };
const FRENCH_SKILLS: CefrSkills  = { listening: 'C1', reading: 'C1', writing: 'C1', spokenProduction: 'B2', spokenInteraction: 'B2' };

/** Who, where, when and the badge of each job, newest first; the text comes per language. */
const JOBS = [
  { company: 'LALUX',               monogram: 'LA', logo: 'logos/lalux.png',               from: '06/2026', to: null },
  { company: 'Societe Generale',    monogram: 'SG', logo: 'logos/societe-generale.svg',    from: '09/2025', to: '06/2026' },
  { company: 'CJEU',                monogram: 'EU', logo: 'logos/cjeu.svg',                from: '02/2025', to: '08/2025' },
  { company: 'European Parliament', monogram: 'EP', logo: 'logos/european-parliament.svg', from: '02/2024', to: '12/2024' },
  { company: 'VERMEG',              monogram: 'VE', logo: 'logos/vermeg.png',              from: '01/2019', to: '01/2024' },
  { company: 'Dewinter Group',      monogram: 'DG',                                        from: '09/2017', to: '12/2018' },
  { company: 'Genioworx',           monogram: 'GE',                                        from: '06/2016', to: '09/2017' },
] as const;

type JobText = Omit<Experience, 'monogram' | 'logo' | 'period' | 'current'>;

/** Puts each job's text together with its shared details; "present" is the word for an open end. */
const experiences = (present: string, texts: JobText[]): Experience[] =>
  JOBS.map((job, i) => ({
    ...texts[i],
    monogram: job.monogram,
    ...('logo' in job ? { logo: job.logo } : {}),
    period: `${job.from} – ${job.to ?? present}`,
    ...(job.to === null ? { current: true } : {}),
  }));

// ── English ────────────────────────────────────────────────────────────────────
const EN: CvContent = {
  label: 'English',
  pageTitle: 'Fakher Hammami — Technical Lead',
  ui: {
    aiSkills: 'AI Skills', about: 'About', experience: 'Experience', skills: 'Skills', education: 'Education & Certifications',
    creative: 'Creative Works', languages: 'Languages',
    degrees: 'Degrees', certifications: 'Certifications', verify: 'Verify on Credly',
    current: 'Current', currently: 'Currently', at: 'at', native: 'Native',
    years: 'Years', companies: 'Companies', certs: 'Certifications',
    downloadCv: 'Download CV', filesNote: '',
    details: 'Technical details', backToCv: 'Back to the CV', technicalDescription: 'Technical description', diagram: 'Diagram',
    comingSoon: 'Coming soon.', zoomIn: 'Zoom in', zoomOut: 'Zoom out', resetZoom: 'Reset zoom', openDiagram: 'Open the diagram full screen',
    close: 'Close', notFound: 'This project does not exist.',
    printTitle: 'Print or save as PDF', lightMode: 'Light mode', darkMode: 'Dark mode',
    toLight: 'Switch to light mode', toDark: 'Switch to dark mode', language: 'Language',
    cefr: { listening: 'Listening', reading: 'Reading', writing: 'Writing', spokenProduction: 'Spoken Production', spokenInteraction: 'Spoken Interaction' },
  },
  hero: {
    name: 'Fakher Hammami',
    title: 'Technical Lead · Senior Java Engineer in Java eco-system',
    role: 'Technical Lead',
    location: 'Luxembourg',
    workPermit: 'Work permit: Luxembourgish',
    born: 'Born 1992 ({age})',
  },
  about: {
    lead:
      'Old-school gem. I learned the craft before AI started writing code: clean architecture, SOLID, design ' +
      'patterns, TDD, honest code reviews, and the discipline of shipping to production without surprises.',
    twist: 'Buuut… I’m not really old school.',
    body:
      'I’m also an agentic architect. I pair 10+ years of Java engineering with AI models and agents to push ' +
      'creativity further — and to make your Java systems more stable, faster and more elegant. With AI or ' +
      'without it, the engineering stays solid: I know when to hand a task to an agent, and when to write it myself.',
    lab: {
      label: 'Right now',
      text: 'Running an enterprise-grade personal lab with AI agents: identity management, Kubernetes, CI/CD and mail, built and operated end to end.',
    },
    context: 'Banking (payments, SWIFT), Life / non-Life insurance (SOLIFE) and EU institutions · Quarkus, Spring, Kafka, Kubernetes and OpenShift.',
    oldSchool: { label: 'Old school', items: ['Clean Architecture', 'SOLID', 'Design Patterns', 'TDD', 'Code Review', 'Scrum'] },
    newSchool: { label: 'New school', items: ['AI Agents', 'LLMs', 'Agentic Workflows', 'AI-assisted Engineering', 'MCP'] },
  },
  aiSkills: [
    { tool: 'Claude', vendor: 'Anthropic', logo: 'logos/claude.svg', level: 'Agentic architect', top: true },
    { tool: 'Codex',  vendor: 'OpenAI',    logo: 'logos/openai.svg', level: 'Prompt engineer' },
  ],
  experiences: experiences('Present', [
    {
      company: 'LALUX', location: 'Luxembourg', role: 'Lead & Technical Reference', type: 'External',
      project: 'EasyApp (main mobile, web and backend application) & DKV — Life / non-Life insurance',
      tasks: [
        'Lead a Quarkus backend team of two senior developers',
        'Develop the Angular frontend for the web part of the applications',
        'Migrate Spring Boot projects to Quarkus',
        'Decommission the DKV services',
        'Work on reimbursements, claims, insurance policies, mobile payments, documents and document management systems (DMS)',
        'Took part in the migration of Payconiq to Wero (mobile payments)',
        'Own and maintain the codebase: code reviews, coding standards, technical and architecture decisions',
        'Drive performance and security across the services',
        'Configure Quarkus integrations with Keycloak, Oracle Database, Kafka Streams and Grafana',
        'Expose Swagger (OpenAPI) endpoints to document the APIs',
        'Implement XML processing with XSD validation and SOAP web services',
        'Lead production investigations and root-cause analysis',
        'Analyse and monitor logs with Elasticsearch, Kibana and Splunk',
        'Manage dev, test and production environments on OpenShift',
        'Set up and maintain CI/CD pipelines with GitHub Actions',
      ],
    },
    {
      company: 'Societe Generale', location: 'Esch-sur-Alzette, Luxembourg', role: 'Technical Expert', type: 'External',
      project: 'Main Banking Payments Platform (banking payments & SWIFT)',
      tasks: [
        'Migrated artifact repository from Nexus to JFrog Artifactory + Xray',
        'Refactored blocking services into reactive endpoints',
        'Investigated production performance issues using logs and monitoring',
        'Contributed to the existing architecture and technical decisions',
        'Exposed Swagger (OpenAPI) endpoints to document the APIs',
        'Worked on Tomcat servers: configuration, deployment and incident investigation',
        'Evaluated Spring vs Quarkus native image proof of concept',
        'Contributed to evolution of legacy payment workflows into SOA',
      ],
    },
    {
      company: 'European Union Justice Court', location: 'Luxembourg', role: 'Senior Software Engineer', type: 'External',
      project: 'Distributed Search Platform',
      tasks: [
        'Built document processing engine extracting structured content from Word files (Apache POI)',
        'Implemented multilingual content pipeline with Angular frontend and Azure DevOps',
        'Developed resilient Spring Boot APIs serving documents from cloud storage',
        'Implemented Elasticsearch indexing for full-text and faceted search',
        'Integrated workflows across distributed microservices environment',
      ],
    },
    {
      company: 'European Parliament', location: 'Kirchberg, Luxembourg', role: 'Senior Software Engineer', type: 'External',
      project: 'EP-VOTE',
      tasks: [
        'Contributed to the unified microfrontend architecture and integrated applications',
        'Exposed Swagger (OpenAPI) endpoints to document the APIs',
        'Developed reactive services using CQRS, SAGA and Event Sourcing',
        'Implemented CI/CD automation pipelines',
        'Mentored developers on clean code and testing',
        'Worked on containerized environments (Docker, Kubernetes, Nginx, Rundeck)',
      ],
    },
    {
      company: 'VERMEG', location: 'Tunis, Tunisia', role: 'Team Lead → Software Engineer', type: 'Permanent',
      project: 'SOLIFE — Life & Investment Insurance Platform',
      subRoles: [
        {
          title: 'Team Lead', period: '01/2023 – 01/2024',
          tasks: [
            'Led team of 5 developers delivering features for the SOLIFE life insurance platform',
            'Clients: Generali, Allianz, Cardif BNP Paribas, GlobalCapital, Suravenir',
            'Coordinated estimations and technical discussions with stakeholders',
            'Technical analysis and ticket dispatching',
            'Managed complex production issues and high-priority corrections',
            'Organized knowledge sharing sessions',
          ],
        },
        {
          title: 'Software Engineer', period: '01/2019 – 01/2023',
          tasks: [
            'Clients: NNbe, AXA Luxembourg, BNP Paribas',
            'SOLIFE functional areas: fund management, fund valuation, accounting entries, billing, treasury management, retroactive policy processing',
            'Maintained existing batches and created new batches',
            'Delivered binary patches (hotfixes)',
            'Delivered queries to identify volumetry and to correct data',
            'Worked on JBoss servers (versions 6 and 7): configuration, deployment and incident investigation',
            'Developed REST services and database logic in high-volume financial environment',
            'Investigated root-cause production issues',
            'Implemented release packaging and deployment processes',
            'Contributed to multi-client deployments (Luxembourg, France, Belgium, Italy)',
          ],
        },
      ],
    },
    {
      company: 'Dewinter Group', location: 'Tunis, Tunisia', role: 'Software Engineer', type: 'Permanent',
      tasks: [
        'Implemented online payment processing including fee and tax calculations',
        'Developed backend administrative dashboard',
        'Improved performance and usability of web applications',
      ],
    },
    {
      company: 'Genioworx', location: 'Tunis, Tunisia', role: 'Junior Software Engineer', type: 'Permanent',
      tasks: [
        'Developed Java backend services and ORM mappings',
        'Integrated Angular dashboards with backend data',
        'Participated in testing, deployment, and user training',
      ],
    },
  ]),
  skillGroups: skillGroups({
    languages: 'Languages & Frameworks', databases: 'Databases', architecture: 'Architectures', patterns: 'Design Patterns',
    devops: 'DevOps', practices: 'Dev Practices', build: 'Repository & Build', versioning: 'Versioning', tools: 'Tools',
  }),
  degrees: [
    { title: 'Computer Science Engineer', institution: 'ESPRIT', location: 'Tunis, Tunisia', period: '09/2018 – 07/2022' },
    { title: 'Higher Technical Diploma (Computer Science)', institution: 'ISET Kelibia', location: 'Tunisia', period: '09/2012 – 06/2016' },
  ],
  certifications: CERTIFICATIONS('scrum.org'),
  works: [
    {
      slug: 'my-lab',
      title: 'My Lab', year: 'Since 2024', context: 'Personal',
      description: 'Enterprise-grade personal lab run with AI agents: identity management with FreeIPA and integrated DNS, a Kubernetes (k3s) cluster behind Traefik, Jenkins CI/CD and a mail server, designed, built and operated end to end.',
      details: {
        paragraphs: [
          'The lab runs on a single Fedora server (i•a, 192.•••.•••.41) and covers the whole path from identity to production: identity management and integrated DNS with FreeIPA, a single-node Kubernetes cluster (k3s) behind a Traefik ingress, Jenkins for CI/CD, a mail server, and a Kafka streaming platform. I designed, built and operate all of it myself, with AI agents working alongside me.',
          'Identity and network. FreeIPA provides users, groups and DNS for the lab. Services are published on the cluster ingress under names of the form <service>.192.•••.•••.41.nip.io, so every deployment gets a stable address without touching the router.',
          'Platform. k3s runs the workloads with local-path storage and Traefik routes, and the cluster also hosts Kafka (KRaft) with a web UI and a schema registry, a Harbor container registry, and Prometheus and Grafana for metrics. HashiCorp Vault stores the secrets: each application logs in with its Kubernetes service account and Quarkus reads its configuration directly from Vault. Outside the cluster, Mailcow provides the mail server (mail.vot•••••.com) and Verdaccio, run as a system service, hosts a private npm registry for my Angular libraries.',
          'Build and quality. A GitHub App connects my GitHub account to Jenkins. One scanner job checks the whole account every minute and creates a pipeline for any repository that has a Jenkinsfile at its root, so a new project needs no Jenkins configuration. Pipelines run the tests with JaCoCo coverage (85% minimum), SonarQube analysis, JVM or native packaging, publication to JFrog Artifactory and then the Docker image build and push. Libraries are published to the private npm registry.',
          "Delivery. After the image is pushed, Jenkins triggers a Rundeck job that runs a deployment script from my infra repository. The script fills the Kubernetes templates (Deployment, Service, Traefik routes, ServiceMonitor), prepares the application's secret path and login role in Vault, and applies them. Prometheus then scrapes the service metrics and Grafana displays them.",
          'Workflow, end to end: push to GitHub, Jenkins discovers and builds, tests and quality gates run, artifacts and images are published, Rundeck deploys to k3s, Vault supplies the secrets and Prometheus and Grafana watch the result. Host names and addresses on this page are partly masked on purpose.',
        ],
        diagram: 'works/my-lab-en.svg',
        diagramAlt: 'Animated diagram of the lab: push to GitHub, Jenkins builds and tests, SonarQube, JFrog and Docker, Rundeck deploys to the k3s cluster running Traefik, Quarkus, Kafka, Vault, Prometheus and Grafana; FreeIPA and Mailcow around.',
      },
    },
    {
      slug: 'jqcd',
      title: 'JQCD — Jira Query Centralized Database', year: '2023', context: 'Vermeg',
      description: 'Tool to extract and centralize all Jira queries delivered to Vermeg clients from 2008 to the present, enabling cross-project analysis and reporting.',
    },
    {
      slug: 'virtual-links',
      title: 'Virtual Links', year: '2023', context: 'Vermeg',
      description: 'Batch system creating a relationship graph across approximately 2,300 non-relational database entities, enabling navigation and impact analysis of otherwise disconnected records.',
    },
    {
      slug: 'devops-system',
      title: 'DevOps System', year: '2018', context: 'Dewinter',
      description: 'Automated CI/CD pipeline replacing manual FTP-based deployments by integrating Jenkins and Git, significantly reducing deployment time and human error.',
    },
  ],
  languages: [
    { name: 'Arabic', motherTongue: true },
    { name: 'English', skills: ENGLISH_SKILLS },
    { name: 'French', skills: FRENCH_SKILLS },
  ],
};

// ── Français ───────────────────────────────────────────────────────────────────
const FR: CvContent = {
  label: 'Français',
  pageTitle: 'Fakher Hammami — Technical Lead',
  ui: {
    aiSkills: 'Compétences IA', about: 'À propos', experience: 'Expérience', skills: 'Compétences', education: 'Formation & certifications',
    creative: 'Réalisations', languages: 'Langues',
    degrees: 'Diplômes', certifications: 'Certifications', verify: 'Vérifier sur Credly',
    current: 'Actuel', currently: 'Actuellement', at: 'chez', native: 'Langue maternelle',
    years: 'Ans', companies: 'Entreprises', certs: 'Certifications',
    downloadCv: 'Télécharger le CV',
    filesNote: 'Version anglaise',
    details: 'Détails techniques', backToCv: 'Retour au CV', technicalDescription: 'Description technique', diagram: 'Schéma',
    comingSoon: 'Bientôt disponible.', zoomIn: 'Zoomer', zoomOut: 'Dézoomer', resetZoom: 'Réinitialiser le zoom', openDiagram: 'Ouvrir le schéma en plein écran',
    close: 'Fermer', notFound: 'Ce projet n’existe pas.',
    printTitle: 'Imprimer ou enregistrer en PDF', lightMode: 'Mode clair', darkMode: 'Mode sombre',
    toLight: 'Passer en mode clair', toDark: 'Passer en mode sombre', language: 'Langue',
    cefr: { listening: 'Compréhension orale', reading: 'Lecture', writing: 'Écriture', spokenProduction: 'Expression orale', spokenInteraction: 'Interaction orale' },
  },
  hero: {
    name: 'Fakher Hammami',
    title: 'Technical Lead · Ingénieur Java senior dans l’écosystème Java',
    role: 'Technical Lead',
    location: 'Luxembourg',
    workPermit: 'Permis de travail : luxembourgeois',
    born: 'Né en 1992 ({age} ans)',
  },
  about: {
    lead:
      'Une pépite old school. J’ai appris le métier avant que l’IA n’écrive du code : architecture propre, SOLID, ' +
      'design patterns, TDD, des revues de code franches, et la discipline de livrer en production sans mauvaises surprises.',
    twist: 'Maaais… je ne suis pas vraiment old school.',
    body:
      'Je suis aussi architecte agentique. J’allie plus de 10 ans d’ingénierie Java aux modèles et agents d’IA pour ' +
      'pousser la créativité plus loin — et rendre vos systèmes Java plus stables, plus rapides et plus élégants. ' +
      'Avec ou sans IA, l’ingénierie reste solide : je sais quand confier une tâche à un agent, et quand l’écrire moi-même.',
    lab: {
      label: 'En ce moment',
      text: 'Je fais tourner un lab personnel de niveau entreprise avec des agents IA : gestion des identités, Kubernetes, CI/CD et messagerie, construits et exploités de bout en bout.',
    },
    context: 'Banque (paiements, SWIFT), assurance Vie / non-Vie (SOLIFE) et institutions européennes · Quarkus, Spring, Kafka, Kubernetes et OpenShift.',
    oldSchool: { label: 'Old school', items: ['Clean Architecture', 'SOLID', 'Design Patterns', 'TDD', 'Code Review', 'Scrum'] },
    newSchool: { label: 'New school', items: ['AI Agents', 'LLMs', 'Agentic Workflows', 'AI-assisted Engineering', 'MCP'] },
  },
  aiSkills: [
    { tool: 'Claude', vendor: 'Anthropic', logo: 'logos/claude.svg', level: 'Architecte agentique', top: true },
    { tool: 'Codex',  vendor: 'OpenAI',    logo: 'logos/openai.svg', level: 'Prompt engineer' },
  ],
  experiences: experiences('Aujourd’hui', [
    {
      company: 'LALUX', location: 'Luxembourg', role: 'Lead & référent technique', type: 'Externe',
      project: 'EasyApp (application principale mobile, web et backend) & DKV — assurance Vie / non-Vie',
      tasks: [
        'Direction d’une équipe backend Quarkus de deux développeurs seniors',
        'Développement frontend avec Angular pour la partie web des applications',
        'Migration de projets Spring Boot vers Quarkus',
        'Décommissionnement des services DKV',
        'Travail sur les remboursements, les sinistres, les polices, les paiements mobiles, les documents et les systèmes GED',
        'Participation à la migration de Payconiq vers Wero (paiements mobiles)',
        'Responsable de la base de code : revues de code, standards de développement, décisions techniques et d’architecture',
        'Pilotage de la performance et de la sécurité des services',
        'Configuration des intégrations Quarkus avec Keycloak, Oracle Database, Kafka Streams et Grafana',
        'Exposition d’endpoints Swagger (OpenAPI) pour documenter les API',
        'Traitement XML avec validation XSD et services web SOAP',
        'Conduite des investigations en production et des analyses de causes racines',
        'Analyse et supervision des logs avec Elasticsearch, Kibana et Splunk',
        'Gestion des environnements de développement, de test et de production sur OpenShift',
        'Mise en place et maintenance des pipelines CI/CD avec GitHub Actions',
      ],
    },
    {
      company: 'Société Générale', location: 'Esch-sur-Alzette, Luxembourg', role: 'Expert technique', type: 'Externe',
      project: 'Plateforme principale de paiements bancaires (paiements et SWIFT)',
      tasks: [
        'Migration du dépôt d’artefacts de Nexus vers JFrog Artifactory + Xray',
        'Refonte de services bloquants en endpoints réactifs',
        'Investigation de problèmes de performance en production à l’aide des logs et du monitoring',
        'Contribution à l’architecture existante et aux décisions techniques',
        'Exposition d’endpoints Swagger (OpenAPI) pour documenter les API',
        'Travail sur les serveurs Tomcat : configuration, déploiement et investigation des incidents',
        'Évaluation d’une preuve de concept Spring vs Quarkus en image native',
        'Contribution à l’évolution des workflows de paiement historiques vers une architecture SOA',
      ],
    },
    {
      company: 'Cour de justice de l’Union européenne', location: 'Luxembourg', role: 'Ingénieur logiciel senior', type: 'Externe',
      project: 'Plateforme de recherche distribuée',
      tasks: [
        'Développement d’un moteur de traitement extrayant le contenu structuré de fichiers Word (Apache POI)',
        'Mise en place d’une chaîne de contenu multilingue avec un frontend Angular et Azure DevOps',
        'Développement d’API Spring Boot résilientes servant des documents depuis un stockage cloud',
        'Indexation Elasticsearch pour la recherche plein texte et à facettes',
        'Intégration de workflows dans un environnement de microservices distribués',
      ],
    },
    {
      company: 'Parlement européen', location: 'Kirchberg, Luxembourg', role: 'Ingénieur logiciel senior', type: 'Externe',
      project: 'EP-VOTE',
      tasks: [
        'Contribution à l’architecture microfrontend unifiée et intégration des applications',
        'Exposition d’endpoints Swagger (OpenAPI) pour documenter les API',
        'Développement de services réactifs avec CQRS, SAGA et Event Sourcing',
        'Mise en place de pipelines d’automatisation CI/CD',
        'Accompagnement des développeurs sur le clean code et les tests',
        'Travail sur des environnements conteneurisés (Docker, Kubernetes, Nginx, Rundeck)',
      ],
    },
    {
      company: 'VERMEG', location: 'Tunis, Tunisie', role: 'Chef d’équipe → Ingénieur logiciel', type: 'CDI',
      project: 'SOLIFE — Plateforme d’assurance Vie et d’investissement',
      subRoles: [
        {
          title: 'Chef d’équipe', period: '01/2023 – 01/2024',
          tasks: [
            'Encadrement d’une équipe de 5 développeurs livrant des fonctionnalités pour la plateforme d’assurance vie SOLIFE',
            'Clients : Generali, Allianz, Cardif BNP Paribas, GlobalCapital, Suravenir',
            'Coordination des estimations et des échanges techniques avec les parties prenantes',
            'Analyse technique et répartition des tickets',
            'Gestion d’incidents de production complexes et de corrections prioritaires',
            'Organisation de sessions de partage de connaissances',
          ],
        },
        {
          title: 'Ingénieur logiciel', period: '01/2019 – 01/2023',
          tasks: [
            'Clients : NNbe, AXA Luxembourg, BNP Paribas',
            'Domaines fonctionnels SOLIFE : gestion de fonds, valorisation des fonds, écritures comptables, billing, gestion de trésorerie, rétroactivité des polices',
            'Maintenance des batchs existants et création de nouveaux batchs',
            'Livraison de patchs binaires (hotfix)',
            'Livraison de requêtes d’identification de volumétrie et de correction de données',
            'Travail sur les serveurs JBoss (versions 6 et 7) : configuration, déploiement et investigation des incidents',
            'Développement de services REST et de logique base de données dans un environnement financier à fort volume',
            'Investigation des causes racines d’incidents de production',
            'Mise en place des processus de packaging et de déploiement des livraisons',
            'Contribution aux déploiements multi-clients (Luxembourg, France, Belgique, Italie)',
          ],
        },
      ],
    },
    {
      company: 'Dewinter Group', location: 'Tunis, Tunisie', role: 'Ingénieur logiciel', type: 'CDI',
      tasks: [
        'Mise en œuvre du paiement en ligne, y compris le calcul des frais et des taxes',
        'Développement d’un tableau de bord d’administration backend',
        'Amélioration de la performance et de l’ergonomie des applications web',
      ],
    },
    {
      company: 'Genioworx', location: 'Tunis, Tunisie', role: 'Ingénieur logiciel junior', type: 'CDI',
      tasks: [
        'Développement de services backend Java et de mappings ORM',
        'Intégration de tableaux de bord Angular avec les données backend',
        'Participation aux tests, au déploiement et à la formation des utilisateurs',
      ],
    },
  ]),
  skillGroups: skillGroups({
    languages: 'Langages & frameworks', databases: 'Bases de données', architecture: 'Architectures', patterns: 'Design patterns',
    devops: 'DevOps', practices: 'Pratiques de développement', build: 'Dépôts & build', versioning: 'Gestion de versions', tools: 'Outils',
  }),
  degrees: [
    { title: 'Diplôme d’ingénieur en informatique', institution: 'ESPRIT', location: 'Tunis, Tunisie', period: '09/2018 – 07/2022' },
    { title: 'Diplôme technique supérieur (informatique)', institution: 'ISET Kélibia', location: 'Tunisie', period: '09/2012 – 06/2016' },
  ],
  certifications: CERTIFICATIONS('scrum.org'),
  works: [
    {
      slug: 'my-lab',
      title: 'Mon lab', year: 'Depuis 2024', context: 'Personnel',
      description: 'Lab personnel de niveau entreprise piloté avec des agents IA : gestion des identités avec FreeIPA et DNS intégré, cluster Kubernetes (k3s) derrière Traefik, CI/CD Jenkins et serveur de messagerie, conçus, construits et exploités de bout en bout.',
      details: {
        paragraphs: [
          'Le lab tourne sur un seul serveur Fedora (i•a, 192.•••.•••.41) et couvre tout le chemin, de l’identité à la production : gestion des identités et DNS intégré avec FreeIPA, un cluster Kubernetes mono-nœud (k3s) derrière un ingress Traefik, Jenkins pour la CI/CD, un serveur de messagerie et une plateforme de streaming Kafka. Je l’ai conçu, construit et je l’exploite moi-même, avec des agents IA à mes côtés.',
          'Identité et réseau. FreeIPA fournit les utilisateurs, les groupes et le DNS du lab. Les services sont publiés sur l’ingress du cluster sous des noms de la forme <service>.192.•••.•••.41.nip.io : chaque déploiement obtient ainsi une adresse stable sans toucher au routeur.',
          'Plateforme. k3s exécute les charges de travail avec un stockage local-path et des routes Traefik. Le cluster héberge aussi Kafka (KRaft) avec une interface web et un registre de schémas, un registre de conteneurs Harbor, ainsi que Prometheus et Grafana pour les métriques. HashiCorp Vault conserve les secrets : chaque application s’authentifie avec son compte de service Kubernetes et Quarkus lit sa configuration directement dans Vault. Hors du cluster, Mailcow fournit le serveur de messagerie (mail.vot•••••.com) et Verdaccio, exécuté comme service système, héberge un registre npm privé pour mes bibliothèques Angular.',
          'Build et qualité. Une GitHub App relie mon compte GitHub à Jenkins. Un job de scan vérifie tout le compte chaque minute et crée un pipeline pour tout dépôt ayant un Jenkinsfile à sa racine : un nouveau projet n’a donc besoin d’aucune configuration Jenkins. Les pipelines exécutent les tests avec la couverture JaCoCo (85 % minimum), l’analyse SonarQube, le packaging JVM ou natif, la publication sur JFrog Artifactory, puis la construction et le push de l’image Docker. Les bibliothèques sont publiées sur le registre npm privé.',
          'Livraison. Une fois l’image poussée, Jenkins déclenche un job Rundeck qui exécute un script de déploiement de mon dépôt infra. Le script complète les modèles Kubernetes (Deployment, Service, routes Traefik, ServiceMonitor), prépare le chemin de secrets et le rôle de connexion de l’application dans Vault, puis les applique. Prometheus collecte ensuite les métriques du service et Grafana les affiche.',
          'Le flux de bout en bout : push sur GitHub, Jenkins découvre et construit, tests et contrôles qualité, publication des artefacts et des images, déploiement par Rundeck sur k3s, secrets fournis par Vault, résultat surveillé par Prometheus et Grafana. Les noms d’hôtes et adresses de cette page sont volontairement masqués en partie.',
        ],
        diagram: 'works/my-lab-fr.svg',
        diagramAlt: 'Schéma animé du lab : push sur GitHub, Jenkins construit et teste, SonarQube, JFrog et Docker, Rundeck déploie sur le cluster k3s (Traefik, Quarkus, Kafka, Vault, Prometheus, Grafana) ; FreeIPA et Mailcow autour.',
      },
    },
    {
      slug: 'jqcd',
      title: 'JQCD — Base centralisée des requêtes Jira', year: '2023', context: 'Vermeg',
      description: 'Outil d’extraction et de centralisation de toutes les requêtes Jira livrées aux clients de Vermeg depuis 2008, permettant l’analyse et le reporting transverses aux projets.',
    },
    {
      slug: 'virtual-links',
      title: 'Virtual Links', year: '2023', context: 'Vermeg',
      description: 'Traitement batch construisant un graphe de relations entre environ 2 300 entités de bases de données non relationnelles, permettant la navigation et l’analyse d’impact entre des enregistrements jusque-là déconnectés.',
    },
    {
      slug: 'devops-system',
      title: 'Système DevOps', year: '2018', context: 'Dewinter',
      description: 'Pipeline CI/CD automatisé remplaçant les déploiements manuels par FTP grâce à l’intégration de Jenkins et Git, réduisant fortement le temps de déploiement et les erreurs humaines.',
    },
  ],
  languages: [
    { name: 'Arabe', motherTongue: true },
    { name: 'Anglais', skills: ENGLISH_SKILLS },
    { name: 'Français', skills: FRENCH_SKILLS },
  ],
};

// ── العربية ───────────────────────────────────────────────────────────────────
const AR: CvContent = {
  label: 'العربية',
  pageTitle: 'فاخر الهمامي — قائد تقني',
  ui: {
    aiSkills: 'مهارات الذكاء الاصطناعي', about: 'نبذة', experience: 'الخبرة المهنية', skills: 'المهارات', education: 'التعليم والشهادات',
    creative: 'مشاريع مميّزة', languages: 'اللغات',
    degrees: 'الشهادات الجامعية', certifications: 'الشهادات المهنية', verify: 'التحقق عبر Credly',
    current: 'حالياً', currently: 'حالياً', at: 'في', native: 'اللغة الأم',
    years: 'سنوات', companies: 'شركات', certs: 'شهادات',
    downloadCv: 'تحميل السيرة الذاتية',
    filesNote: 'النسخة الإنجليزية',
    details: 'التفاصيل التقنية', backToCv: 'العودة إلى السيرة الذاتية', technicalDescription: 'الوصف التقني', diagram: 'المخطط',
    comingSoon: 'قريباً.', zoomIn: 'تكبير', zoomOut: 'تصغير', resetZoom: 'إعادة الضبط', openDiagram: 'فتح المخطط بملء الشاشة',
    close: 'إغلاق', notFound: 'هذا المشروع غير موجود.',
    printTitle: 'طباعة أو حفظ بصيغة PDF', lightMode: 'الوضع الفاتح', darkMode: 'الوضع الداكن',
    toLight: 'التبديل إلى الوضع الفاتح', toDark: 'التبديل إلى الوضع الداكن', language: 'اللغة',
    cefr: { listening: 'الاستماع', reading: 'القراءة', writing: 'الكتابة', spokenProduction: 'التعبير الشفهي', spokenInteraction: 'التفاعل الشفهي' },
  },
  hero: {
    name: 'فاخر الهمامي',
    title: 'قائد تقني · مهندس Java أول في منظومة Java',
    role: 'قائد تقني',
    location: 'لوكسمبورغ',
    workPermit: 'تصريح العمل: لوكسمبورغي',
    born: 'مواليد 1992 ({age} سنة)',
  },
  about: {
    lead:
      'جوهرة من المدرسة القديمة. تعلّمت الحرفة قبل أن يبدأ الذكاء الاصطناعي بكتابة الشيفرة: البنية النظيفة ومبادئ SOLID ' +
      'وأنماط التصميم والتطوير الموجّه بالاختبارات (TDD) ومراجعات الشيفرة الصريحة، وانضباط النشر في الإنتاج دون مفاجآت.',
    twist: 'لكن… لستُ من المدرسة القديمة تماماً.',
    body:
      'أنا أيضاً مهندس أنظمة وكيلية (Agentic Architect). أجمع بين أكثر من 10 سنوات من هندسة Java ونماذج الذكاء ' +
      'الاصطناعي ووكلائه لأدفع الإبداع إلى الأمام، ولأجعل أنظمة Java لديكم أكثر استقراراً وسرعةً وأناقة. ' +
      'مع الذكاء الاصطناعي أو بدونه، تبقى الهندسة متينة: أعرف متى أُسند المهمة إلى وكيل، ومتى أكتبها بنفسي.',
    lab: {
      label: 'حالياً',
      text: 'أدير مختبراً شخصياً بمستوى المؤسسات مع وكلاء الذكاء الاصطناعي: إدارة الهويات وKubernetes وCI/CD والبريد الإلكتروني، أبنيها وأشغّلها من البداية إلى النهاية.',
    },
    context: 'القطاع البنكي (المدفوعات وSWIFT) وتأمين الحياة وغير الحياة (SOLIFE) والمؤسسات الأوروبية · Quarkus وSpring وKafka وKubernetes وOpenShift.',
    oldSchool: { label: 'المدرسة القديمة', items: ['Clean Architecture', 'SOLID', 'Design Patterns', 'TDD', 'Code Review', 'Scrum'] },
    newSchool: { label: 'المدرسة الجديدة', items: ['AI Agents', 'LLMs', 'Agentic Workflows', 'AI-assisted Engineering', 'MCP'] },
  },
  aiSkills: [
    { tool: 'Claude', vendor: 'Anthropic', logo: 'logos/claude.svg', level: 'مهندس أنظمة وكيلية', top: true },
    { tool: 'Codex',  vendor: 'OpenAI',    logo: 'logos/openai.svg', level: 'مهندس أوامر (Prompt engineer)' },
  ],
  experiences: experiences('حتى الآن', [
    {
      company: 'LALUX', location: 'لوكسمبورغ', role: 'قائد ومرجع تقني', type: 'متعاقد خارجي',
      project: 'EasyApp (التطبيق الرئيسي للهاتف المحمول والويب والواجهة الخلفية) و DKV — تأمين الحياة وتأمين غير الحياة',
      tasks: [
        'قيادة فريق backend يعمل بـ Quarkus ويضم مطوّرَين اثنين من ذوي الخبرة',
        'تطوير الواجهة الأمامية بـ Angular لجزء الويب من التطبيقات',
        'ترحيل مشاريع Spring Boot إلى Quarkus',
        'الإيقاف التدريجي لخدمات DKV (decommissioning)',
        'العمل على التعويضات والمطالبات ووثائق التأمين والدفع عبر الهاتف المحمول والمستندات وأنظمة إدارة الوثائق (GED)',
        'المشاركة في ترحيل Payconiq إلى Wero (الدفع عبر الهاتف المحمول)',
        'الإشراف على الشيفرة المصدرية وصيانتها: مراجعة الشيفرة ومعايير البرمجة والقرارات التقنية والمعمارية',
        'قيادة جهود الأداء والأمان في مختلف الخدمات',
        'إعداد تكامل Quarkus مع Keycloak وOracle Database وKafka Streams وGrafana',
        'إتاحة نقاط وصول Swagger (OpenAPI) لتوثيق واجهات API',
        'تنفيذ معالجة XML مع التحقق عبر XSD وخدمات الويب SOAP',
        'قيادة التحقيقات في بيئة الإنتاج وتحليل الأسباب الجذرية',
        'تحليل السجلات ومراقبتها باستخدام Elasticsearch وKibana وSplunk',
        'إدارة بيئات التطوير والاختبار والإنتاج على OpenShift',
        'إعداد خطوط CI/CD وصيانتها باستخدام GitHub Actions',
      ],
    },
    {
      company: 'Société Générale', location: 'إش-سور-ألزيت، لوكسمبورغ', role: 'خبير تقني', type: 'متعاقد خارجي',
      project: 'المنصة الرئيسية للمدفوعات البنكية (المدفوعات وSWIFT)',
      tasks: [
        'ترحيل مستودع الحزم من Nexus إلى JFrog Artifactory + Xray',
        'إعادة هيكلة الخدمات المتزامنة (blocking) إلى نقاط وصول تفاعلية (reactive)',
        'التحقيق في مشاكل الأداء في الإنتاج باستخدام السجلات وأدوات المراقبة',
        'المساهمة في البنية المعمارية القائمة وفي القرارات التقنية',
        'إتاحة نقاط وصول Swagger (OpenAPI) لتوثيق واجهات API',
        'العمل على خوادم Tomcat: الإعداد والنشر والتحقيق في الأعطال',
        'تقييم إثبات مفهوم يقارن بين Spring وQuarkus بالصورة الأصلية (native image)',
        'المساهمة في تطوير مسارات الدفع القديمة نحو بنية SOA',
      ],
    },
    {
      company: 'محكمة العدل التابعة للاتحاد الأوروبي', location: 'لوكسمبورغ', role: 'مهندس برمجيات أول', type: 'متعاقد خارجي',
      project: 'منصة البحث الموزّعة',
      tasks: [
        'بناء محرّك لمعالجة المستندات يستخرج المحتوى المنظّم من ملفات Word (Apache POI)',
        'تنفيذ مسار محتوى متعدد اللغات بواجهة Angular وAzure DevOps',
        'تطوير واجهات Spring Boot API مرنة تقدّم المستندات من التخزين السحابي',
        'تنفيذ الفهرسة عبر Elasticsearch للبحث في النص الكامل والبحث متعدد الأوجه',
        'دمج مسارات العمل في بيئة خدمات مصغّرة موزّعة',
      ],
    },
    {
      company: 'البرلمان الأوروبي', location: 'كيرشبرغ، لوكسمبورغ', role: 'مهندس برمجيات أول', type: 'متعاقد خارجي',
      project: 'EP-VOTE',
      tasks: [
        'المساهمة في بنية microfrontend الموحّدة ودمج التطبيقات ضمنها',
        'إتاحة نقاط وصول Swagger (OpenAPI) لتوثيق واجهات API',
        'تطوير خدمات تفاعلية باستخدام CQRS وSAGA وEvent Sourcing',
        'تنفيذ خطوط أتمتة CI/CD',
        'توجيه المطوّرين في كتابة شيفرة نظيفة وفي الاختبارات',
        'العمل على بيئات الحاويات (Docker وKubernetes وNginx وRundeck)',
      ],
    },
    {
      company: 'VERMEG', location: 'تونس العاصمة، تونس', role: 'قائد فريق ← مهندس برمجيات', type: 'عقد دائم',
      project: 'SOLIFE — منصة التأمين على الحياة والتأمين الاستثماري',
      subRoles: [
        {
          title: 'قائد فريق', period: '01/2023 – 01/2024',
          tasks: [
            'قيادة فريق من 5 مطوّرين لتسليم ميزات منصة التأمين على الحياة SOLIFE',
            'العملاء: Generali وAllianz وCardif BNP Paribas وGlobalCapital وSuravenir',
            'تنسيق التقديرات والنقاشات التقنية مع الأطراف المعنية',
            'التحليل التقني وتوزيع المهام',
            'معالجة مشاكل الإنتاج المعقّدة والتصحيحات ذات الأولوية القصوى',
            'تنظيم جلسات لتبادل المعرفة',
          ],
        },
        {
          title: 'مهندس برمجيات', period: '01/2019 – 01/2023',
          tasks: [
            'العملاء: NNbe وAXA Luxembourg وBNP Paribas',
            'المجالات الوظيفية في SOLIFE: إدارة الصناديق، تقييم الصناديق، القيود المحاسبية، الفوترة، إدارة الخزينة، المعالجة بأثر رجعي لوثائق التأمين',
            'صيانة الدفعات (batches) القائمة وإنشاء دفعات جديدة',
            'تسليم رقع ثنائية (hotfix)',
            'تسليم استعلامات لتحديد الحجم ولتصحيح البيانات',
            'العمل على خوادم JBoss (الإصداران 6 و7): الإعداد والنشر والتحقيق في الأعطال',
            'تطوير خدمات REST ومنطق قواعد البيانات في بيئة مالية عالية الحجم',
            'التحقيق في الأسباب الجذرية لمشاكل الإنتاج',
            'تنفيذ عمليات تحزيم الإصدارات ونشرها',
            'المساهمة في عمليات النشر لعدة عملاء (لوكسمبورغ، فرنسا، بلجيكا، إيطاليا)',
          ],
        },
      ],
    },
    {
      company: 'Dewinter Group', location: 'تونس العاصمة، تونس', role: 'مهندس برمجيات', type: 'عقد دائم',
      tasks: [
        'تنفيذ معالجة الدفع الإلكتروني بما في ذلك حساب الرسوم والضرائب',
        'تطوير لوحة تحكم إدارية للواجهة الخلفية',
        'تحسين أداء تطبيقات الويب وسهولة استخدامها',
      ],
    },
    {
      company: 'Genioworx', location: 'تونس العاصمة، تونس', role: 'مهندس برمجيات مبتدئ', type: 'عقد دائم',
      tasks: [
        'تطوير خدمات Java للواجهة الخلفية وربط ORM',
        'دمج لوحات Angular مع بيانات الواجهة الخلفية',
        'المشاركة في الاختبار والنشر وتدريب المستخدمين',
      ],
    },
  ]),
  skillGroups: skillGroups({
    languages: 'اللغات والأطر البرمجية', databases: 'قواعد البيانات', architecture: 'البنى المعمارية', patterns: 'أنماط التصميم',
    devops: 'DevOps', practices: 'ممارسات التطوير', build: 'المستودعات والبناء', versioning: 'إدارة الإصدارات', tools: 'الأدوات',
  }),
  degrees: [
    { title: 'شهادة مهندس في علوم الحاسوب', institution: 'ESPRIT', location: 'تونس العاصمة، تونس', period: '09/2018 – 07/2022' },
    { title: 'شهادة تقني سامٍ في علوم الحاسوب', institution: 'المعهد العالي للدراسات التكنولوجية بقليبية', location: 'تونس', period: '09/2012 – 06/2016' },
  ],
  certifications: CERTIFICATIONS('scrum.org'),
  works: [
    {
      slug: 'my-lab',
      title: 'مختبري', year: 'منذ 2024', context: 'شخصي',
      description: 'مختبر شخصي بمستوى المؤسسات أديره مع وكلاء الذكاء الاصطناعي: إدارة الهويات عبر FreeIPA مع DNS مدمج، وعنقود Kubernetes (k3s) خلف Traefik، وخطوط CI/CD عبر Jenkins، وخادم بريد إلكتروني، صمّمتها وبنيتها وأشغّلها من البداية إلى النهاية.',
      details: {
        paragraphs: [
          'يعمل المختبر على خادم Fedora واحد (i•a، 192.•••.•••.41) ويغطي المسار كاملاً من الهوية إلى الإنتاج: إدارة الهويات وDNS المدمج عبر FreeIPA، وعنقود Kubernetes بعقدة واحدة (k3s) خلف مدخل Traefik، وJenkins للتكامل والنشر المستمرين، وخادم بريد إلكتروني، ومنصة بث Kafka. صمّمتُ كل ذلك وبنيته وأشغّله بنفسي، مع وكلاء الذكاء الاصطناعي إلى جانبي.',
          'الهوية والشبكة. يوفّر FreeIPA المستخدمين والمجموعات وDNS للمختبر. تُنشر الخدمات على مدخل العنقود بأسماء على الصيغة <service>.192.•••.•••.41.nip.io، فينال كل نشر عنواناً ثابتاً دون المساس بالموجّه.',
          'المنصة. يشغّل k3s الأحمال بتخزين local-path ومسارات Traefik، ويستضيف العنقود أيضاً Kafka (KRaft) مع واجهة ويب وسجلّ مخططات، وسجلّ حاويات Harbor، وPrometheus وGrafana للمقاييس. يحفظ HashiCorp Vault الأسرار: يسجّل كل تطبيق دخوله بحساب الخدمة في Kubernetes ويقرأ Quarkus إعداداته مباشرة من Vault. خارج العنقود يوفّر Mailcow خادم البريد (mail.vot•••••.com) ويستضيف Verdaccio، المشغَّل كخدمة نظام، سجلّ npm خاصاً لمكتباتي المبنية بـ Angular.',
          'البناء والجودة. يربط GitHub App حسابي على GitHub بـ Jenkins. تفحص مهمة مسح الحساب كاملاً كل دقيقة وتنشئ خط معالجة لأي مستودع فيه Jenkinsfile في جذره، فلا يحتاج المشروع الجديد إلى أي إعداد في Jenkins. تشغّل الخطوط الاختبارات مع تغطية JaCoCo (85% كحد أدنى) وتحليل SonarQube والتحزيم JVM أو الأصلي والنشر على JFrog Artifactory ثم بناء صورة Docker ودفعها. تُنشر المكتبات على سجلّ npm الخاص.',
          'التسليم. بعد دفع الصورة يطلق Jenkins مهمة Rundeck تنفّذ سكربت نشر من مستودع infra الخاص بي. يملأ السكربت قوالب Kubernetes (Deployment وService ومسارات Traefik وServiceMonitor) ويجهّز مسار أسرار التطبيق ودور تسجيل دخوله في Vault ثم يطبّقها. بعدها يجمع Prometheus مقاييس الخدمة ويعرضها Grafana.',
          'المسار من البداية إلى النهاية: دفع إلى GitHub، فاكتشاف Jenkins وبناؤه، ثم الاختبارات وبوابات الجودة، ونشر الحزم والصور، ثم نشر Rundeck على k3s، مع أسرار من Vault ومراقبة النتيجة عبر Prometheus وGrafana. أسماء المضيفين والعناوين في هذه الصفحة مخفية جزئياً عن قصد.',
        ],
        diagram: 'works/my-lab-ar.svg',
        diagramAlt: 'مخطط متحرك للمختبر: دفع إلى GitHub، وJenkins يبني ويختبر، وSonarQube وJFrog وDocker، ثم Rundeck ينشر على عنقود k3s الذي يشغّل Traefik وQuarkus وKafka وVault وPrometheus وGrafana؛ مع FreeIPA وMailcow.',
      },
    },
    {
      slug: 'jqcd',
      title: 'JQCD — قاعدة بيانات مركزية لاستعلامات Jira', year: '2023', context: 'Vermeg',
      description: 'أداة لاستخراج وتجميع جميع استعلامات Jira المسلّمة لعملاء Vermeg منذ 2008 حتى اليوم، ما يتيح التحليل وإعداد التقارير على مستوى المشاريع.',
    },
    {
      slug: 'virtual-links',
      title: 'Virtual Links', year: '2023', context: 'Vermeg',
      description: 'نظام معالجة دفعية يبني شبكة علاقات بين نحو 2,300 كيان في قواعد بيانات غير علائقية، ما يتيح التنقل وتحليل الأثر بين سجلات كانت منفصلة.',
    },
    {
      slug: 'devops-system',
      title: 'نظام DevOps', year: '2018', context: 'Dewinter',
      description: 'خط CI/CD مؤتمت يحلّ محل النشر اليدوي عبر FTP بدمج Jenkins وGit، ما قلّل بشكل كبير من وقت النشر والأخطاء البشرية.',
    },
  ],
  languages: [
    { name: 'العربية', motherTongue: true },
    { name: 'الإنجليزية', skills: ENGLISH_SKILLS },
    { name: 'الفرنسية', skills: FRENCH_SKILLS },
  ],
};

export const CONTENT: Record<Lang, CvContent> = { en: EN, fr: FR, ar: AR };
export const LANGS: Lang[] = ['en', 'fr', 'ar'];
