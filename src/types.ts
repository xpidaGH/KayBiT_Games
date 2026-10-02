export type ProjectId = 'voxel' | 'pipeline' | 'procedural' | 'kinematic' | 'sandbox' | 'economy';

export interface CodeSnippet {
  language: string;
  filename: string;
  description: string;
  code: string;
}

export interface ProjectData {
  id: ProjectId;
  number: string;
  title: string;
  subtitle: string;
  inspiration: string;
  color: string;
  accentHex: string;
  targetLanguages: string[];
  coreDomains: string[];
  overview: string;
  requirements: {
    title: string;
    description: string;
    metricLabel: string;
    metricValue: string;
  }[];
  codeSnippets: CodeSnippet[];
  architectureNotes: string[];
}

export type I18nLangCode =
  | 'en' // English
  | 'fr' // French
  | 'de' // German
  | 'it' // Italian
  | 'es' // Spanish
  | 'pt' // Portuguese
  | 'id' // Indonesian
  | 'sw' // Swahili
  | 'tr' // Turkish
  | 'ru' // Russian
  | 'zh' // Chinese
  | 'ja' // Japanese
  | 'ar' // Arabic (RTL)
  | 'ur' // Urdu (RTL)
  | 'hi' // Hindi
  | 'vi' // Vietnamese
  | 'ko' // Korean
  | 'fa' // Farsi/Persian (RTL)
  | 'mr' // Marathi
  | 'bn' // Bangla/Bengali
  | 'ta' // Tamil
  | 'te'; // Telugu

export interface I18nLangMeta {
  code: I18nLangCode;
  label: string;
  nativeLabel: string;
  dir: 'ltr' | 'rtl';
  flag: string;
}

export interface UserGuideSection {
  title: string;
  content: string;
  subsections?: {
    subtitle: string;
    body: string;
    codeSnippet?: string;
  }[];
}

export interface UserGuideTranslation {
  languageName: string;
  dir: 'ltr' | 'rtl';
  title: string;
  subtitle: string;
  introduction: string;
  quickStart: string;
  projectGuides: {
    id: ProjectId;
    title: string;
    inspiration: string;
    focus: string;
    coreConcepts: string[];
    technicalArchitecture: string;
    learningExercises: string[];
  }[];
  technologyMatrixTitle: string;
  technologyMatrixSummary: string;
  gradingRubricTitle: string;
  gradingRubric: {
    criteria: string;
    weight: string;
    description: string;
  }[];
  glossary: {
    term: string;
    definition: string;
  }[];
}
