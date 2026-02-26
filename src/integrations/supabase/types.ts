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
      guardrail_exceptions: {
        Row: {
          approved_by: string | null
          created_at: string
          expires_at: string | null
          id: string
          reason: string
          rule_id: string
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          reason: string
          rule_id: string
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          reason?: string
          rule_id?: string
        }
        Relationships: []
      }
      library_entries: {
        Row: {
          content: string | null
          created_at: string
          created_by: string | null
          embedding: string | null
          entry_type: string
          id: string
          related_entry_ids: string[] | null
          rules: string[] | null
          source_id: string | null
          status: string
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string
          version: number
        }
        Insert: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          embedding?: string | null
          entry_type: string
          id?: string
          related_entry_ids?: string[] | null
          rules?: string[] | null
          source_id?: string | null
          status?: string
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          version?: number
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          embedding?: string | null
          entry_type?: string
          id?: string
          related_entry_ids?: string[] | null
          rules?: string[] | null
          source_id?: string | null
          status?: string
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "library_entries_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
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
        }
        Relationships: [
          {
            foreignKeyName: "sources_duplicate_of_fkey"
            columns: ["duplicate_of"]
            isOneToOne: false
            referencedRelation: "sources"
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
        }
        Insert: {
          aliases?: string[] | null
          category?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          aliases?: string[] | null
          category?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
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
      versions: {
        Row: {
          change_summary: string | null
          changed_by: string | null
          created_at: string
          diff: Json | null
          entity_id: string
          entity_type: string
          id: string
          snapshot: Json
          title: string
          version_number: number
        }
        Insert: {
          change_summary?: string | null
          changed_by?: string | null
          created_at?: string
          diff?: Json | null
          entity_id: string
          entity_type: string
          id?: string
          snapshot?: Json
          title: string
          version_number?: number
        }
        Update: {
          change_summary?: string | null
          changed_by?: string | null
          created_at?: string
          diff?: Json | null
          entity_id?: string
          entity_type?: string
          id?: string
          snapshot?: Json
          title?: string
          version_number?: number
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
