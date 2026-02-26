export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          session_type: string
          source_id: string | null
          title: string
          updated_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          session_type?: string
          source_id?: string | null
          title?: string
          updated_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          session_type?: string
          source_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_sessions_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      guardrail_exceptions: {
        Row: {
          approved_by: string | null
          created_at: string
          expires_at: string | null
          id: string
          reason: string
          rule_id: string
          workspace_id: string | null
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          reason: string
          rule_id: string
          workspace_id?: string | null
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          reason?: string
          rule_id?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guardrail_exceptions_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      kit_rules: {
        Row: {
          created_at: string | null
          id: string
          kit_id: string
          notes: string | null
          rule_id: string
          severity_override: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          kit_id: string
          notes?: string | null
          rule_id: string
          severity_override?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          kit_id?: string
          notes?: string | null
          rule_id?: string
          severity_override?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kit_rules_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "kits"
            referencedColumns: ["id"]
          },
        ]
      }
      kits: {
        Row: {
          channel: string
          component_subset: string[] | null
          created_at: string | null
          created_by: string | null
          description: string | null
          guardrail_profile: string[] | null
          id: string
          is_default: boolean | null
          layout_constraints: Json | null
          name: string
          slug: string
          sort_order: number | null
          token_overrides: Json | null
          tone_modifiers: string[] | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          channel?: string
          component_subset?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          guardrail_profile?: string[] | null
          id?: string
          is_default?: boolean | null
          layout_constraints?: Json | null
          name: string
          slug: string
          sort_order?: number | null
          token_overrides?: Json | null
          tone_modifiers?: string[] | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          channel?: string
          component_subset?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          guardrail_profile?: string[] | null
          id?: string
          is_default?: boolean | null
          layout_constraints?: Json | null
          name?: string
          slug?: string
          sort_order?: number | null
          token_overrides?: Json | null
          tone_modifiers?: string[] | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kits_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      library_entries: {
        Row: {
          confidence: number | null
          content: string | null
          created_at: string
          created_by: string | null
          embedding: string | null
          entry_type: string
          id: string
          is_canonical: boolean
          related_entry_ids: string[] | null
          rules: string[] | null
          source_id: string | null
          status: string
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string
          version: number
          workspace_id: string | null
        }
        Insert: {
          confidence?: number | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          embedding?: string | null
          entry_type: string
          id?: string
          is_canonical?: boolean
          related_entry_ids?: string[] | null
          rules?: string[] | null
          source_id?: string | null
          status?: string
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          version?: number
          workspace_id?: string | null
        }
        Update: {
          confidence?: number | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          embedding?: string | null
          entry_type?: string
          id?: string
          is_canonical?: boolean
          related_entry_ids?: string[] | null
          rules?: string[] | null
          source_id?: string | null
          status?: string
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          version?: number
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "library_entries_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "library_entries_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          message: string | null
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          message?: string | null
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          message?: string | null
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      onboarding_content: {
        Row: {
          body: string
          content_key: string
          created_at: string | null
          id: string
          metadata: Json | null
          title: string | null
          updated_at: string | null
          updated_by: string | null
          workspace_id: string
        }
        Insert: {
          body: string
          content_key: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          title?: string | null
          updated_at?: string | null
          updated_by?: string | null
          workspace_id: string
        }
        Update: {
          body?: string
          content_key?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          title?: string | null
          updated_at?: string | null
          updated_by?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_content_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          email_digest: boolean
          id: string
          onboarding_completed: boolean | null
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          email_digest?: boolean
          id: string
          onboarding_completed?: boolean | null
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          email_digest?: boolean
          id?: string
          onboarding_completed?: boolean | null
        }
        Relationships: []
      }
      review_decisions: {
        Row: {
          code_snippet: string | null
          created_at: string
          created_by: string | null
          fix_plan: Json
          id: string
          session_id: string
          source_id: string | null
          status: string
          title: string
          updated_at: string
          violations: Json
          workspace_id: string
        }
        Insert: {
          code_snippet?: string | null
          created_at?: string
          created_by?: string | null
          fix_plan?: Json
          id?: string
          session_id: string
          source_id?: string | null
          status?: string
          title: string
          updated_at?: string
          violations?: Json
          workspace_id: string
        }
        Update: {
          code_snippet?: string | null
          created_at?: string
          created_by?: string | null
          fix_plan?: Json
          id?: string
          session_id?: string
          source_id?: string | null
          status?: string
          title?: string
          updated_at?: string
          violations?: Json
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_decisions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_decisions_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      sources: {
        Row: {
          created_at: string
          duplicate_of: string | null
          error_message: string | null
          file_hash: string | null
          file_type: string
          file_url: string | null
          id: string
          pages_processed: number | null
          retry_count: number
          status: string
          title: string
          total_pages: number | null
          uploaded_by: string | null
          workspace_id: string | null
        }
        Insert: {
          created_at?: string
          duplicate_of?: string | null
          error_message?: string | null
          file_hash?: string | null
          file_type: string
          file_url?: string | null
          id?: string
          pages_processed?: number | null
          retry_count?: number
          status?: string
          title: string
          total_pages?: number | null
          uploaded_by?: string | null
          workspace_id?: string | null
        }
        Update: {
          created_at?: string
          duplicate_of?: string | null
          error_message?: string | null
          file_hash?: string | null
          file_type?: string
          file_url?: string | null
          id?: string
          pages_processed?: number | null
          retry_count?: number
          status?: string
          title?: string
          total_pages?: number | null
          uploaded_by?: string | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sources_duplicate_of_fkey"
            columns: ["duplicate_of"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sources_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tag_vocabulary: {
        Row: {
          aliases: string[] | null
          category: string | null
          created_at: string
          id: string
          name: string
          workspace_id: string | null
        }
        Insert: {
          aliases?: string[] | null
          category?: string | null
          created_at?: string
          id?: string
          name: string
          workspace_id?: string | null
        }
        Update: {
          aliases?: string[] | null
          category?: string | null
          created_at?: string
          id?: string
          name?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tag_vocabulary_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          component_jsx: string
          copy_spec: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_default: boolean | null
          kit_id: string
          layout_spec: string | null
          name: string
          slot_schema: Json | null
          sort_order: number | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          component_jsx: string
          copy_spec?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          kit_id: string
          layout_spec?: string | null
          name: string
          slot_schema?: Json | null
          sort_order?: number | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          component_jsx?: string
          copy_spec?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          kit_id?: string
          layout_spec?: string | null
          name?: string
          slot_schema?: Json | null
          sort_order?: number | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "kits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "templates_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      variant_assets: {
        Row: {
          alt_text: string | null
          created_at: string | null
          file_type: string
          file_url: string
          id: string
          variant_id: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          file_type: string
          file_url: string
          id?: string
          variant_id: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          file_type?: string
          file_url?: string
          id?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_assets_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variant_tags: {
        Row: {
          created_at: string | null
          id: string
          tag_name: string
          variant_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          tag_name: string
          variant_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          tag_name?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_tags_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variants: {
        Row: {
          component_ids: string[] | null
          content: Json
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          slot_type: string
          sort_order: number | null
          token_category: string | null
          updated_at: string | null
          voice_token_ids: string[] | null
          workspace_id: string
        }
        Insert: {
          component_ids?: string[] | null
          content: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          slot_type: string
          sort_order?: number | null
          token_category?: string | null
          updated_at?: string | null
          voice_token_ids?: string[] | null
          workspace_id: string
        }
        Update: {
          component_ids?: string[] | null
          content?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          slot_type?: string
          sort_order?: number | null
          token_category?: string | null
          updated_at?: string | null
          voice_token_ids?: string[] | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variants_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      versions: {
        Row: {
          change_summary: string | null
          changed_by: string | null
          created_at: string
          diff: Json | null
          entity_id: string
          entity_type: string
          id: string
          reason: string | null
          snapshot: Json
          title: string
          version_number: number
          workspace_id: string | null
        }
        Insert: {
          change_summary?: string | null
          changed_by?: string | null
          created_at?: string
          diff?: Json | null
          entity_id: string
          entity_type: string
          id?: string
          reason?: string | null
          snapshot?: Json
          title: string
          version_number?: number
          workspace_id?: string | null
        }
        Update: {
          change_summary?: string | null
          changed_by?: string | null
          created_at?: string
          diff?: Json | null
          entity_id?: string
          entity_type?: string
          id?: string
          reason?: string | null
          snapshot?: Json
          title?: string
          version_number?: number
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "versions_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_tokens: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          donts: string[] | null
          dos: string[] | null
          id: string
          name: string
          severity: string
          sort_order: number | null
          token_type: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          donts?: string[] | null
          dos?: string[] | null
          id?: string
          name: string
          severity?: string
          sort_order?: number | null
          token_type: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          donts?: string[] | null
          dos?: string[] | null
          id?: string
          name?: string
          severity?: string
          sort_order?: number | null
          token_type?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_tokens_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_members: {
        Row: {
          id: string
          joined_at: string
          role: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          role?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_workspace_member: {
        Args: { _user_id: string; _workspace_id: string }
        Returns: boolean
      }
      match_library_entries: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          content: string
          entry_type: string
          id: string
          rules: string[]
          similarity: number
          status: string
          summary: string
          tags: string[]
          title: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "viewer"],
    },
  },
} as const
