/**
 * Brand Configuration Loader
 * Reads config/brand.yaml at build time and exports a typed config object.
 * All brand-specific values in the site come from this module.
 */

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// Resolve brand.yaml: works locally (cwd=site/) and on Vercel (cwd=project root)
const CONFIG_PATH = fs.existsSync(path.resolve(process.cwd(), 'config', 'brand.yaml'))
  ? path.resolve(process.cwd(), 'config', 'brand.yaml')
  : path.resolve(process.cwd(), '..', 'config', 'brand.yaml');

const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
export const brand = yaml.load(raw) as BrandConfig;

// --- Type Definitions ---

export interface FontConfig {
  family: string;
  fallback: string;
  google_import: string;
}

export interface ProofPoint {
  metric: string;
  label: string;
  meaning: string;
  display_in_metrics_bar?: boolean;
}

export interface Testimonial {
  name: string;
  industry: string;
  contact_name: string;
  contact_role: string;
  testimonial: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface PageType {
  type: string;
  label: string;
  description: string;
  purpose: string;
  target_count: number;
}

export interface Location {
  city: string;
  country: string;
  address?: string;
}

export interface BrandConfig {
  business: {
    name: string;
    legal_entity: string;
    tagline: string;
    tagline_alt: string;
    description: string;
    positioning: string;
    founded: number;
    employee_count: string;
    experience: string;
    website: string;
    email: string;
    booking_link: string;
  };
  founders: Array<{ name: string; role: string; linkedin: string }>;
  values: Array<{ name: string; description: string }>;
  locations: {
    primary: Location[];
    service_regions: string[];
  };
  differentiator: {
    name: string;
    description: string;
    proof_points: ProofPoint[];
  };
  process: Array<{ step: number; name: string; detail: string }>;
  services: Array<{ name: string; description: string; typical_roles: string[] }>;
  target_segments: Array<{
    priority: number;
    name: string;
    key: string;
    description: string;
    buyer_titles: string[];
    pain_points: string[];
    keywords_seed: string[];
  }>;
  target_industries: string[];
  brand_voice: {
    tone: string;
    personality: string;
    do: string[];
    dont: string[];
    sample_phrasing: { bad: string; good: string };
  };
  clients: {
    named: Testimonial[];
    industries_served_count: string;
    platforms_scanned: string;
    parameters_evaluated: string;
  };
  social_profiles: {
    linkedin_company: string;
    crunchbase?: string;
    twitter?: string;
  };
  competitors: Record<string, Array<{ name: string; url: string }>>;
  integrations: string[];
  pricing: {
    model: string;
    note: string;
    content_approach: string;
  };
  content_config: {
    subdirectory: string;
    base_url: string;
    page_types: PageType[];
  };
  design: {
    colors: Record<string, string>;
    segment_colors: Record<string, string[]>;
    fonts: { heading: FontConfig; body: FontConfig };
    radii: Record<string, string>;
    logo_text: { primary: string; accent: string };
  };
  navigation: {
    header: { logo_link: string; cta_text: string; cta_link: string };
    footer: { links: NavLink[]; copyright_holder: string };
  };
  cta: {
    heading: string;
    subheading: string;
    primary_button: { text: string; link: string };
    secondary_button: { text: string; link: string };
    hub: { heading: string; subheading: string };
  };
  deployment: {
    platform: string;
    project_name: string;
    domain: string;
  };
  canonical_pages: {
    main_service_page: {
      slug: string;
      anchors: Record<string, string>;
    };
  };
}
