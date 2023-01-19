import { CustomModule, CustomOption, QuillModules } from 'ngx-quill';

export interface SfQuillConfig {
  format?: 'object' | 'html' | 'text' | 'json';
  theme?: string;
  modules?: QuillModules;
  debug?: 'warn' | 'log' | 'error' | 'info' | false;
  readOnly?: boolean;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  required: boolean;
  formats?: string[] | null;
  customToolbarPosition: 'top' | 'bottom';
  sanitize?: boolean;
  beforeRender?: () => Promise<void>;
  styles: any;
  strict: boolean;
  scrollingContainer?: HTMLElement | string | null;
  bounds?: HTMLElement | string;
  customOptions: CustomOption[];
  customModules: CustomModule[];
  trackChanges?: 'user' | 'all';
  preserveWhitespace: boolean;
  classes?: string;
  trimOnValidation: boolean;
  linkPlaceholder?: string;
  compareValues: boolean;
  filterNull: boolean;
  debounceTime?: number;
  defaultEmptyValue?: any;
}

export function isJsonString(str: string): boolean {
  try {
    if (typeof JSON.parse(str) == 'object') {
      return true;
    }
  } catch (e) {}
  return false;
}
