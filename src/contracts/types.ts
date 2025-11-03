export interface FetchOptions<U = unknown>
  extends Omit<RequestInit, 'method' | 'headers' | 'body' | 'signal'> {
  onSuccess: (res: U) => void;
}

export interface Listing {
  pagination: {
    page: number;
    per_page: number;
    total_items: number;
  };
}

// AUDIT

interface AuditTag {
  description: string;
  name: string;
  url?: string;
}

type AuditItemImpact = 'critical' | 'serious' | 'moderate' | 'minor';
type AuditItemStatus = 'to-tests' | 'failed' | 'passed';

interface AuditItem {
  id: string;
  impact: { key: AuditItemImpact; label: string } | null | undefined;
  nodes: { html: string; target: string[] }[];
  profiles: Record<string, string>;
  recommendations: string;
  requirements: string;
  status?: AuditItemStatus;
  tags: Record<string, AuditTag>;
  title: string;
}

export interface AuditContent {
  manual_audits: AuditItem[];
  not_applicable: AuditItem[];
  passed_audits: AuditItem[];
  screenshot: string;
  summary: {
    accessibility_score_percent: number;
    by_impact: {
      critical: number;
      minor: number;
      moderate: number;
      serious: number;
      unknown: number;
    };
    manual_audits: number;
    not_applicable: number;
    passed_audits: number;
    violations: number;
  };
  violations: AuditItem[];
}
