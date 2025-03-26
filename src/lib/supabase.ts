import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to the hardcoded values for testing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ucollzbsowmjbvaxtvwn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjb2xsemJzb3dtamJ2YXh0dnduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2OTk2NjUsImV4cCI6MjA1NzI3NTY2NX0.sZdaoxdbm-wv1D-oOKyV1i3cU894inIyr0ZwF-fMZYA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface LEDData {
  uuid_part_number: string;
  packaging_type: string;
  viewing_angle: number;
  peak_wavelength_nm: string;
  wavelength_nm_from: number;
  wavelength_nm_to: number;
  dc_forward_current_min_ma: number;
  dc_forward_current_typ_ma: number;
  dc_forward_current_max_ma: number;
  forward_voltage_min_v: number;
  forward_voltage_typ_v: number;
  forward_voltage_max_v: number;
  reel_quantity: number;
  radiant_power_from_mw: string;
  radiant_power_to_mw: string;
  radiant_power_range: string;
  data_sheet_version: string;
  data_sheet_date: Date;
  main_spec_description: string;
  pdf_id: string;
}

export interface Datasheet {
  pdf_id: string;
  data_sheet_name: string;
  pdf_url: string;
  created_at: Date;
  vector_embedding: number[];
} 