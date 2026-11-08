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

export interface CvContent {
  /** The name of this language in itself, for the switcher. */
  label:     string;
  pageTitle: string;
  ui: {
    about: string; experience: string; skills: string; education: string; creative: string; languages: string;
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
    location: string; workPermit: string; born: string;
  };
  about:          string;
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
                 'Quarkus', 'Kafka Streams', 'Keycloak', 'JavaScript', 'jQuery', 'NodeJS', 'ExpressJS',
                 'RESTful API', 'SOAP', 'HTML5', 'CSS', 'JSON', 'XML', 'WSDL', 'XSD', 'XPDL'],
  databases:    ['Oracle', 'PostgreSQL', 'Redis', 'ElasticSearch'],
  architecture: ['Microservices', 'Microfrontends', 'MVC', 'Semi-monolithic', 'Monolithic'],
  patterns:     ['Chassis Design', 'CQRS', 'SAGA', 'Event Sourcing'],
  devops:       ['Docker', 'Kubernetes', 'OpenShift', 'GitHub Actions', 'Jenkins', 'Grafana', 'Rundeck', 'XLDeploy', 'XL Release', 'Containerization'],
  practices:    ['BDD', 'TDD', 'Agile', 'Scrum', 'Functional Reactive Programming'],
  build:        ['Maven', 'NPM', 'Yarn', 'Composer', 'Nexus', 'JFrog Artifactory'],
  versioning:   ['Git', 'SVN'],
  tools:        ['IntelliJ IDEA', 'DataGrip', 'Oracle SQL Developer', 'PL/SQL', 'JBoss 6 & 7', 'Postman', 'SoapUI', 'MINIO',
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
    about: 'About', experience: 'Experience', skills: 'Skills', education: 'Education & Certifications',
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
    title: 'Technical Lead · Senior Java Engineer · 10+ Years',
    role: 'Technical Lead',
    location: 'Luxembourg',
    workPermit: 'Work permit: Luxembourgish',
    born: 'Born 15 / 10 / 1992',
  },
  about:
    'Technical lead and senior Java engineer with 10+ years of experience designing and evolving enterprise ' +
    'systems in banking, insurance, and institutional environments. Leads backend teams as codebase owner and ' +
    'reviewer, setting the bar for code quality, performance, and security. Specialized in modernizing legacy ' +
    'platforms into scalable Quarkus and Spring microservices, and in running them reliably from development ' +
    'to production on Kubernetes and OpenShift. Hands-on profile combining development, production ' +
    'investigation, and technical decision-making across multi-team contexts.',
  experiences: experiences('Present', [
    {
      company: 'LALUX', location: 'Luxembourg', role: 'Technical Lead', type: 'External',
      tasks: [
        'Lead a Quarkus backend team of two senior developers',
        'Own and maintain the codebase: code reviews, coding standards and technical decisions',
        'Drive performance and security across the services',
        'Configure Quarkus integrations with Keycloak, Oracle Database, Kafka Streams and Grafana',
        'Implement XML processing with XSD validation and SOAP web services',
        'Lead production investigations and root-cause analysis',
        'Manage dev, test and production environments on OpenShift',
        'Set up and maintain CI/CD pipelines with GitHub Actions',
      ],
    },
    {
      company: 'Societe Generale', location: 'Esch-sur-Alzette, Luxembourg', role: 'Technical Expert', type: 'External',
      project: 'Main Banking Payments Platform',
      tasks: [
        'Migrated artifact repository from Nexus to JFrog Artifactory + Xray',
        'Refactored blocking services into reactive endpoints',
        'Investigated production performance issues using logs and monitoring',
        'Adapted CI/CD pipelines to new delivery architecture',
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
        'Integrated applications into unified microfrontend architecture',
        'Developed reactive services using CQRS, SAGA and Event Sourcing',
        'Implemented CI/CD automation pipelines',
        'Mentored developers on clean code and testing',
        'Worked on containerized environments (Docker, Kubernetes, Nginx, Rundeck)',
      ],
    },
    {
      company: 'VERMEG', location: 'Tunis, Tunisia', role: 'Team Lead → Software Engineer', type: 'Permanent',
      project: 'SOLIFE — Core Insurance & Asset Management Platform',
      subRoles: [
        {
          title: 'Team Lead', period: '01/2023 – 01/2024',
          tasks: [
            'Led team of 5 developers delivering features for life insurance platform',
            'Coordinated estimations and technical discussions with stakeholders',
            'Technical analysis and ticket dispatching',
            'Managed complex production issues and high-priority corrections',
            'Organized knowledge sharing sessions',
          ],
        },
        {
          title: 'Software Engineer', period: '01/2019 – 01/2023',
          tasks: [
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
      company: 'Genioworx', location: 'Tunis, Tunisia', role: 'Software Engineer Junior / Intern', type: 'Permanent',
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
    about: 'À propos', experience: 'Expérience', skills: 'Compétences', education: 'Formation & certifications',
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
    title: 'Technical Lead · Ingénieur Java senior · 10+ ans d’expérience',
    role: 'Technical Lead',
    location: 'Luxembourg',
    workPermit: 'Permis de travail : luxembourgeois',
    born: 'Né le 15 / 10 / 1992',
  },
  about:
    'Technical lead et ingénieur Java senior avec plus de 10 ans d’expérience dans la conception et l’évolution ' +
    'de systèmes d’entreprise dans la banque, l’assurance et les institutions européennes. Dirige des équipes backend ' +
    'en tant que responsable et relecteur du code, en fixant le niveau d’exigence en qualité, performance et sécurité. ' +
    'Spécialisé dans la modernisation de plateformes historiques en microservices Quarkus et Spring évolutifs, et dans ' +
    'leur exploitation fiable, du développement à la production, sur Kubernetes et OpenShift. Profil opérationnel alliant ' +
    'développement, investigation en production et prise de décisions techniques dans des contextes multi-équipes.',
  experiences: experiences('Aujourd’hui', [
    {
      company: 'LALUX', location: 'Luxembourg', role: 'Technical Lead', type: 'Externe',
      tasks: [
        'Direction d’une équipe backend Quarkus de deux développeurs seniors',
        'Responsable de la base de code : revues de code, standards de développement et décisions techniques',
        'Pilotage de la performance et de la sécurité des services',
        'Configuration des intégrations Quarkus avec Keycloak, Oracle Database, Kafka Streams et Grafana',
        'Traitement XML avec validation XSD et services web SOAP',
        'Conduite des investigations en production et des analyses de causes racines',
        'Gestion des environnements de développement, de test et de production sur OpenShift',
        'Mise en place et maintenance des pipelines CI/CD avec GitHub Actions',
      ],
    },
    {
      company: 'Société Générale', location: 'Esch-sur-Alzette, Luxembourg', role: 'Expert technique', type: 'Externe',
      project: 'Plateforme principale de paiements bancaires',
      tasks: [
        'Migration du dépôt d’artefacts de Nexus vers JFrog Artifactory + Xray',
        'Refonte de services bloquants en endpoints réactifs',
        'Investigation de problèmes de performance en production à l’aide des logs et du monitoring',
        'Adaptation des pipelines CI/CD à la nouvelle architecture de livraison',
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
        'Intégration d’applications dans une architecture microfrontend unifiée',
        'Développement de services réactifs avec CQRS, SAGA et Event Sourcing',
        'Mise en place de pipelines d’automatisation CI/CD',
        'Accompagnement des développeurs sur le clean code et les tests',
        'Travail sur des environnements conteneurisés (Docker, Kubernetes, Nginx, Rundeck)',
      ],
    },
    {
      company: 'VERMEG', location: 'Tunis, Tunisie', role: 'Chef d’équipe → Ingénieur logiciel', type: 'CDI',
      project: 'SOLIFE — Plateforme d’assurance et de gestion d’actifs',
      subRoles: [
        {
          title: 'Chef d’équipe', period: '01/2023 – 01/2024',
          tasks: [
            'Encadrement d’une équipe de 5 développeurs livrant des fonctionnalités pour une plateforme d’assurance vie',
            'Coordination des estimations et des échanges techniques avec les parties prenantes',
            'Analyse technique et répartition des tickets',
            'Gestion d’incidents de production complexes et de corrections prioritaires',
            'Organisation de sessions de partage de connaissances',
          ],
        },
        {
          title: 'Ingénieur logiciel', period: '01/2019 – 01/2023',
          tasks: [
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
      company: 'Genioworx', location: 'Tunis, Tunisie', role: 'Ingénieur logiciel junior / stagiaire', type: 'CDI',
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
    about: 'نبذة', experience: 'الخبرة المهنية', skills: 'المهارات', education: 'التعليم والشهادات',
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
    title: 'قائد تقني · مهندس Java أول · أكثر من 10 سنوات خبرة',
    role: 'قائد تقني',
    location: 'لوكسمبورغ',
    workPermit: 'تصريح العمل: لوكسمبورغي',
    born: 'تاريخ الميلاد: 15 / 10 / 1992',
  },
  about:
    'قائد تقني ومهندس Java أول بخبرة تزيد عن 10 سنوات في تصميم أنظمة المؤسسات وتطويرها في القطاع البنكي ' +
    'والتأمين والمؤسسات الأوروبية. يقود فرق الواجهات الخلفية (backend) بصفته المسؤول عن الشيفرة المصدرية ومراجعتها، ' +
    'ويضع معايير الجودة والأداء والأمان. متخصص في تحديث المنصات القديمة وتحويلها إلى خدمات مصغّرة قابلة للتوسع ' +
    'باستخدام Quarkus وSpring، وتشغيلها بموثوقية من التطوير إلى الإنتاج على Kubernetes وOpenShift. ' +
    'يجمع بين التطوير العملي والتحقيق في مشاكل الإنتاج واتخاذ القرارات التقنية في بيئات متعددة الفرق.',
  experiences: experiences('حتى الآن', [
    {
      company: 'LALUX', location: 'لوكسمبورغ', role: 'قائد تقني', type: 'متعاقد خارجي',
      tasks: [
        'قيادة فريق backend يعمل بـ Quarkus ويضم مطوّرَين اثنين من ذوي الخبرة',
        'الإشراف على الشيفرة المصدرية وصيانتها: مراجعة الشيفرة ومعايير البرمجة والقرارات التقنية',
        'قيادة جهود الأداء والأمان في مختلف الخدمات',
        'إعداد تكامل Quarkus مع Keycloak وOracle Database وKafka Streams وGrafana',
        'تنفيذ معالجة XML مع التحقق عبر XSD وخدمات الويب SOAP',
        'قيادة التحقيقات في بيئة الإنتاج وتحليل الأسباب الجذرية',
        'إدارة بيئات التطوير والاختبار والإنتاج على OpenShift',
        'إعداد خطوط CI/CD وصيانتها باستخدام GitHub Actions',
      ],
    },
    {
      company: 'Société Générale', location: 'إش-سور-ألزيت، لوكسمبورغ', role: 'خبير تقني', type: 'متعاقد خارجي',
      project: 'المنصة الرئيسية للمدفوعات البنكية',
      tasks: [
        'ترحيل مستودع الحزم من Nexus إلى JFrog Artifactory + Xray',
        'إعادة هيكلة الخدمات المتزامنة (blocking) إلى نقاط وصول تفاعلية (reactive)',
        'التحقيق في مشاكل الأداء في الإنتاج باستخدام السجلات وأدوات المراقبة',
        'تكييف خطوط CI/CD مع بنية التسليم الجديدة',
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
        'دمج التطبيقات ضمن بنية microfrontend موحّدة',
        'تطوير خدمات تفاعلية باستخدام CQRS وSAGA وEvent Sourcing',
        'تنفيذ خطوط أتمتة CI/CD',
        'توجيه المطوّرين في كتابة شيفرة نظيفة وفي الاختبارات',
        'العمل على بيئات الحاويات (Docker وKubernetes وNginx وRundeck)',
      ],
    },
    {
      company: 'VERMEG', location: 'تونس العاصمة، تونس', role: 'قائد فريق ← مهندس برمجيات', type: 'عقد دائم',
      project: 'SOLIFE — منصة التأمين وإدارة الأصول',
      subRoles: [
        {
          title: 'قائد فريق', period: '01/2023 – 01/2024',
          tasks: [
            'قيادة فريق من 5 مطوّرين لتسليم ميزات منصة التأمين على الحياة',
            'تنسيق التقديرات والنقاشات التقنية مع الأطراف المعنية',
            'التحليل التقني وتوزيع المهام',
            'معالجة مشاكل الإنتاج المعقّدة والتصحيحات ذات الأولوية القصوى',
            'تنظيم جلسات لتبادل المعرفة',
          ],
        },
        {
          title: 'مهندس برمجيات', period: '01/2019 – 01/2023',
          tasks: [
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
      company: 'Genioworx', location: 'تونس العاصمة، تونس', role: 'مهندس برمجيات مبتدئ / متدرّب', type: 'عقد دائم',
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
