import * as joda from "@js-joda/core";
import { DB } from ".";

type authorization_type = "caring" | "nursing" | "medication" | "caringplus";
type bloodpressure_context_value = "standing" | "sitting" | "lying";
type bloodsample_kind =
  | "PTT"
  | "Digoxine"
  | "TSH"
  | "T3"
  | "T4"
  | "CRP"
  | "Hemoglobine"
  | "Iron"
  | "INR"
  | "HbA1c"
  | "eGFR";
type call_reason_category_type =
  | "fall"
  | "request"
  | "social"
  | "accidental"
  | "other"
  | "health"
  | "toiletvisit";
type call_source = "module" | "publicapi" | "timeout" | "cas";
type callback_category = "location_call";
type callback_status = "NEW" | "SUCCESS" | "FAILED" | "ABORTED";
type cas_mode = "ACTIVE" | "INACTIVE" | "DELETED";
type dementia_stage =
  | "unknown"
  | "none"
  | "early-stage"
  | "mid-stage"
  | "late-stage";
type glycemia_context_value = "sober" | "notsober";
type heartbeat_type = "device" | "app";
type measurement_type =
  | "pulse"
  | "temperature"
  | "weight"
  | "urineoutput"
  | "bloodpressure"
  | "stoolrecord"
  | "glycemia"
  | "length"
  | "oxygensaturation"
  | "visualpainscale"
  | "bloodsample"
  | "morsefallscale"
  | "waterlowscale";
type medication_phase = "prepare" | "validate" | "distribute" | "administer";
type mis_mode = "PRESENT" | "ABSENT";
type monitor_heat_status = "NORMAL" | "OVERHEAT";
type monitor_rmq_status = "NOT_PROCESSING" | "PROCESSING" | "NOT_APPLICABLE";
type monitor_voice_status = "NOT_APPLICABLE" | "REGISTERED" | "NOT_REGISTERED";
type morsefallscale_ambulatoryaid_answer =
  | "nurseassist"
  | "crutches"
  | "furniture";
type morsefallscale_gait_answer = "normal" | "weak" | "impaired";
type morsefallscale_mentalstatus_answer = "normal" | "forgetslimitations";
type pulse_context_value = "normal" | "weak" | "strong" | "irregular";
type shortcut_type = "IFRAME" | "IMAGE_AUTO_REFRESH" | "IMAGE_MANUAL_REFRESH";
type stoolrecord_context_value =
  | "normal"
  | "diarrhea"
  | "slimy"
  | "bloody"
  | "faecaloma";
type t_blood_type = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
type urineoutput_context_value = "clear" | "cloudy" | "bloody" | "purulent";
type waterlowscale_agerange_answer =
  | "14_to_49"
  | "50_to_64"
  | "65_to_74"
  | "75_to_80"
  | "81_plus";
type waterlowscale_apetite_answer =
  | "average"
  | "bad"
  | "nutrional_probe_or_liquid_only"
  | "not_oral_or_anorexia";
type waterlowscale_build_height_answer =
  | "average"
  | "above_average"
  | "obese"
  | "below_average";
type waterlowscale_continence_answer =
  | "complete_catheterised"
  | "incontinence_urine_only"
  | "incontinence_faeces_only"
  | "incontinence_urine_faeces";
type waterlowscale_extensive_surgery_answer =
  | "orthopedic_spinal"
  | "on_table_longer_2h"
  | "on_table_longer_6h";
type waterlowscale_gender_answer = "male" | "female";
type waterlowscale_medications_answer =
  | "cryostatic_drugs"
  | "high_dose_steroids"
  | "anti_inflamatory";
type waterlowscale_mobility_answer =
  | "no_restrictions"
  | "restless"
  | "apathetic"
  | "restricted"
  | "bedbound"
  | "chairbound";
type waterlowscale_neurological_disorders_answer =
  | "diabetes_ms_stroke"
  | "motor_sensory_paraplegia";
type waterlowscale_skintype_answer =
  | "healthy"
  | "tissue_paper"
  | "dry"
  | "oedematous"
  | "clammy_sticky"
  | "discoloured"
  | "cracked_stained";
type waterlowscale_specialrisks_answer =
  | "skin_nutrition_disorders"
  | "multiple_organ_failure"
  | "single_organ_failure"
  | "peripheral_vascular_diseases"
  | "anaemia"
  | "smoking";

export const db = new DB<MyDb>({
  tables: {
    access_control_access_door_group: {
      __meta: {
        name: "access_control_access_door_group",
        schema: "public",
      },
      fields: {
        access_control_identifier: {
          name: "access_control_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        access_door_group_identifier: {
          name: "access_door_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    access_door_access_control: {
      __meta: {
        name: "access_door_access_control",
        schema: "public",
      },
      fields: {
        access_door_identifier: {
          name: "access_door_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        access_control_identifier: {
          name: "access_control_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    access_door_access_group: {
      __meta: {
        name: "access_door_access_group",
        schema: "public",
      },
      fields: {
        access_door_identifier: {
          name: "access_door_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        access_group_identifier: {
          name: "access_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    access_door_door_procedure: {
      __meta: {
        name: "access_door_door_procedure",
        schema: "public",
      },
      fields: {
        access_door_identifier: {
          name: "access_door_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        door_procedure_identifier: {
          name: "door_procedure_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    access_door_group_access_group: {
      __meta: {
        name: "access_door_group_access_group",
        schema: "public",
      },
      fields: {
        access_door_group_identifier: {
          name: "access_door_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        access_group_identifier: {
          name: "access_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    access_group_badge: {
      __meta: {
        name: "access_group_badge",
        schema: "public",
      },
      fields: {
        access_group_identifier: {
          name: "access_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        badge_identifier: {
          name: "badge_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    application_svp_crews: {
      __meta: {
        name: "application_svp_crews",
        schema: "public",
      },
      fields: {
        application_svp_identifier: {
          name: "application_svp_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        crew_identifier: {
          name: "crew_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    application_svp_status: {
      __meta: {
        name: "application_svp_status",
        schema: "public",
      },
      fields: {
        application_svp_identifier: {
          name: "application_svp_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        status_identifier: {
          name: "status_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    broadcast_call_broadcast_call_group: {
      __meta: {
        name: "broadcast_call_broadcast_call_group",
        schema: "public",
      },
      fields: {
        broadcast_call_identifier: {
          name: "broadcast_call_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        broadcast_call_group_identifier: {
          name: "broadcast_call_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    broadcast_call_group_device: {
      __meta: {
        name: "broadcast_call_group_device",
        schema: "public",
      },
      fields: {
        broadcast_call_group_identifier: {
          name: "broadcast_call_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        device_identifier: {
          name: "device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    cas_audit_log: {
      __meta: {
        name: "cas_audit_log",
        schema: "public",
      },
      fields: {
        transaction: {
          name: "transaction",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        relation: {
          name: "relation",
          type: { kind: "scalar", name: { name: "text" } },
        },
        operation: {
          name: "operation",
          type: { kind: "scalar", name: { name: "text" } },
        },
        old: {
          name: "old",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "jsonb" } },
          },
        },
        new: {
          name: "new",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "jsonb" } },
          },
        },
        source: {
          name: "source",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        executed_at: {
          name: "executed_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
      },
    },
    cas_notification: {
      __meta: {
        name: "cas_notification",
        schema: "public",
      },
      fields: {
        category: {
          name: "category",
          type: { kind: "scalar", name: { name: "text" } },
        },
        payload: {
          name: "payload",
          type: { kind: "scalar", name: { name: "jsonb" } },
        },
      },
    },
    cas_report: {
      __meta: {
        name: "cas_report",
        schema: "public",
      },
      fields: {
        key: { name: "key", type: { kind: "scalar", name: { name: "text" } } },
        meta: {
          name: "meta",
          type: { kind: "scalar", name: { name: "json" } },
        },
        visible: {
          name: "visible",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
      },
    },
    cas_session: {
      __meta: {
        name: "cas_session",
        schema: "public",
      },
      fields: {
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "uuid" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        created_at: {
          name: "created_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        refreshed_at: {
          name: "refreshed_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
      },
    },
    crew_location: {
      __meta: {
        name: "crew_location",
        schema: "public",
      },
      fields: {
        crew_identifier: {
          name: "crew_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    dect_group_dect_account: {
      __meta: {
        name: "dect_group_dect_account",
        schema: "public",
      },
      fields: {
        dect_group_identifier: {
          name: "dect_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        dect_account_identifier: {
          name: "dect_account_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    dect_group_location: {
      __meta: {
        name: "dect_group_location",
        schema: "public",
      },
      fields: {
        dect_group_identifier: {
          name: "dect_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    diary_read: {
      __meta: {
        name: "diary_read",
        schema: "public",
      },
      fields: {
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        read_at: {
          name: "read_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
      },
    },
    employee_authorization: {
      __meta: {
        name: "employee_authorization",
        schema: "public",
      },
      fields: {
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        authorization_type: {
          name: "authorization_type",
          type: { kind: "scalar", name: { name: "authorization_type" } },
        },
      },
    },
    engine_call_action_message_destination_employee_role: {
      __meta: {
        name: "engine_call_action_message_destination_employee_role",
        schema: "public",
      },
      fields: {
        engine_call_action_message_destination_employee_identifier: {
          name: "engine_call_action_message_destination_employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        role_identifier: {
          name: "role_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    flyway_schema_history: {
      __meta: {
        name: "flyway_schema_history",
        schema: "public",
      },
      fields: {
        installed_rank: {
          name: "installed_rank",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        version: {
          name: "version",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "character varying" } },
          },
        },
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "character varying" } },
        },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "character varying" } },
        },
        script: {
          name: "script",
          type: { kind: "scalar", name: { name: "character varying" } },
        },
        checksum: {
          name: "checksum",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        installed_by: {
          name: "installed_by",
          type: { kind: "scalar", name: { name: "character varying" } },
        },
        installed_on: {
          name: "installed_on",
          type: {
            kind: "scalar",
            name: { name: "timestamp without time zone" },
          },
        },
        execution_time: {
          name: "execution_time",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        success: {
          name: "success",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
      },
    },
    location_gateway_device_gateway: {
      __meta: {
        name: "location_gateway_device_gateway",
        schema: "public",
      },
      fields: {
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        device_identifier: {
          name: "device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    location_patient: {
      __meta: {
        name: "location_patient",
        schema: "public",
      },
      fields: {
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    management_account_management_site: {
      __meta: {
        name: "management_account_management_site",
        schema: "public",
      },
      fields: {
        management_account_identifier: {
          name: "management_account_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        management_site_identifier: {
          name: "management_site_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    management_site_management_server: {
      __meta: {
        name: "management_site_management_server",
        schema: "public",
      },
      fields: {
        management_site_identifier: {
          name: "management_site_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        management_server_identifier: {
          name: "management_server_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    message_images: {
      __meta: {
        name: "message_images",
        schema: "public",
      },
      fields: {
        message_identifier: {
          name: "message_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        image_identifier: {
          name: "image_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    message_read_employees: {
      __meta: {
        name: "message_read_employees",
        schema: "public",
      },
      fields: {
        message_identifier: {
          name: "message_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    message_read_patients: {
      __meta: {
        name: "message_read_patients",
        schema: "public",
      },
      fields: {
        message_identifier: {
          name: "message_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    message_to_patients: {
      __meta: {
        name: "message_to_patients",
        schema: "public",
      },
      fields: {
        message_identifier: {
          name: "message_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    message_to_roles: {
      __meta: {
        name: "message_to_roles",
        schema: "public",
      },
      fields: {
        message_identifier: {
          name: "message_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        role_identifier: {
          name: "role_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    patient_group_ui_access: {
      __meta: {
        name: "patient_group_ui_access",
        schema: "public",
      },
      fields: {
        patient_group_identifier: {
          name: "patient_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        ui_access_identifier: {
          name: "ui_access_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    patient_lifeline_message_pending: {
      __meta: {
        name: "patient_lifeline_message_pending",
        schema: "public",
      },
      fields: {
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        lifeline_message_identifier: {
          name: "lifeline_message_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    patient_medical_information_allergies: {
      __meta: {
        name: "patient_medical_information_allergies",
        schema: "public",
      },
      fields: {
        patient_medical_information_identifier: {
          name: "patient_medical_information_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        allergy_identifier: {
          name: "allergy_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    patient_patient_group: {
      __meta: {
        name: "patient_patient_group",
        schema: "public",
      },
      fields: {
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_group_identifier: {
          name: "patient_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    possible_work_order_role: {
      __meta: {
        name: "possible_work_order_role",
        schema: "public",
      },
      fields: {
        possible_work_order_identifier: {
          name: "possible_work_order_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        role_identifier: {
          name: "role_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    rf_module_brand: {
      __meta: {
        name: "rf_module_brand",
        schema: "public",
      },
      fields: {
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
      },
    },
    rf_module_type: {
      __meta: {
        name: "rf_module_type",
        schema: "public",
      },
      fields: {
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
      },
    },
    role_status: {
      __meta: {
        name: "role_status",
        schema: "public",
      },
      fields: {
        role_identifier: {
          name: "role_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        status_identifier: {
          name: "status_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    role_ui_access: {
      __meta: {
        name: "role_ui_access",
        schema: "public",
      },
      fields: {
        role_identifier: {
          name: "role_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        ui_access_identifier: {
          name: "ui_access_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    roles_engine_call_action_message_destination_email: {
      __meta: {
        name: "roles_engine_call_action_message_destination_email",
        schema: "public",
      },
      fields: {
        role_identifier: {
          name: "role_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        engine_call_action_message_destination_email_identifier: {
          name: "engine_call_action_message_destination_email_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    spectralink_group_location: {
      __meta: {
        name: "spectralink_group_location",
        schema: "public",
      },
      fields: {
        spectralink_group_identifier: {
          name: "spectralink_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    spectralink_group_spectralink_account: {
      __meta: {
        name: "spectralink_group_spectralink_account",
        schema: "public",
      },
      fields: {
        spectralink_group_identifier: {
          name: "spectralink_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_account_identifier: {
          name: "spectralink_account_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    state_cause_template_device: {
      __meta: {
        name: "state_cause_template_device",
        schema: "public",
      },
      fields: {
        state_cause_template_identifier: {
          name: "state_cause_template_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        device_identifier: {
          name: "device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    status: {
      __meta: {
        name: "status",
        schema: "public",
      },
      fields: {
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "text" } },
        },
        icon: {
          name: "icon",
          type: { kind: "scalar", name: { name: "text" } },
        },
        color: {
          name: "color",
          type: { kind: "scalar", name: { name: "text" } },
        },
        text_color: {
          name: "text_color",
          type: { kind: "scalar", name: { name: "text" } },
        },
        background_color: {
          name: "background_color",
          type: { kind: "scalar", name: { name: "text" } },
        },
        pursuit_sound_repeat: {
          name: "pursuit_sound_repeat",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        pursuit_sound_night_repeat: {
          name: "pursuit_sound_night_repeat",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        pursuit_sound: {
          name: "pursuit_sound",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        pursuit_sound_night: {
          name: "pursuit_sound_night",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        priority: {
          name: "priority",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        dect_identifier: {
          name: "dect_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        app_identifier: {
          name: "app_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
      },
    },
    task_types_roles: {
      __meta: {
        name: "task_types_roles",
        schema: "public",
      },
      fields: {
        task_type_identifier: {
          name: "task_type_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        role_identifier: {
          name: "role_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    trusted_device_patient: {
      __meta: {
        name: "trusted_device_patient",
        schema: "public",
      },
      fields: {
        trusted_device_identifier: {
          name: "trusted_device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    trusted_device_sui_status: {
      __meta: {
        name: "trusted_device_sui_status",
        schema: "public",
      },
      fields: {
        trusted_device_identifier: {
          name: "trusted_device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        sui_status_identifier: {
          name: "sui_status_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    access_door: {
      __meta: {
        name: "access_door",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        device_identifier: {
          name: "device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    access_group: {
      __meta: {
        name: "access_group",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    action_config: {
      __meta: {
        name: "action_config",
        schema: "public",
      },
      fields: {
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    action_config_dect_to_crews_of_location: {
      __meta: {
        name: "action_config_dect_to_crews_of_location",
        schema: "public",
      },
      fields: {
        dect_type: {
          name: "dect_type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        dect_beep: {
          name: "dect_beep",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        dect_priority: {
          name: "dect_priority",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        message: {
          name: "message",
          type: { kind: "scalar", name: { name: "text" } },
        },
        action_config_identifier: {
          name: "action_config_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        only_to_employees_on_duty: {
          name: "only_to_employees_on_duty",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    action_config_dect_to_crews_of_location_role: {
      __meta: {
        name: "action_config_dect_to_crews_of_location_role",
        schema: "public",
      },
      fields: {
        action_config_dect_to_crews_of_location_identifier: {
          name: "action_config_dect_to_crews_of_location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        role_identifier: {
          name: "role_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    action_config_dect_to_group: {
      __meta: {
        name: "action_config_dect_to_group",
        schema: "public",
      },
      fields: {
        dect_type: {
          name: "dect_type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        dect_beep: {
          name: "dect_beep",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        dect_priority: {
          name: "dect_priority",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        message: {
          name: "message",
          type: { kind: "scalar", name: { name: "text" } },
        },
        action_config_identifier: {
          name: "action_config_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    action_config_dect_to_group_dect_group: {
      __meta: {
        name: "action_config_dect_to_group_dect_group",
        schema: "public",
      },
      fields: {
        action_config_dect_to_group_identifier: {
          name: "action_config_dect_to_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        dect_group_identifier: {
          name: "dect_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    action_config_spectralink_to_crews_of_location: {
      __meta: {
        name: "action_config_spectralink_to_crews_of_location",
        schema: "public",
      },
      fields: {
        message: {
          name: "message",
          type: { kind: "scalar", name: { name: "text" } },
        },
        spectralink_action: {
          name: "spectralink_action",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_response: {
          name: "spectralink_response",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_color: {
          name: "spectralink_color",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_alerttone: {
          name: "spectralink_alerttone",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_alertvolume: {
          name: "spectralink_alertvolume",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_alerttimeout: {
          name: "spectralink_alerttimeout",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_callback: {
          name: "spectralink_callback",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        action_config_identifier: {
          name: "action_config_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        only_to_employees_on_duty: {
          name: "only_to_employees_on_duty",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    action_config_spectralink_to_crews_of_location_role: {
      __meta: {
        name: "action_config_spectralink_to_crews_of_location_role",
        schema: "public",
      },
      fields: {
        action_config_spectralink_to_crews_of_location_identifier: {
          name: "action_config_spectralink_to_crews_of_location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        role_identifier: {
          name: "role_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    action_config_spectralink_to_group: {
      __meta: {
        name: "action_config_spectralink_to_group",
        schema: "public",
      },
      fields: {
        message: {
          name: "message",
          type: { kind: "scalar", name: { name: "text" } },
        },
        spectralink_action: {
          name: "spectralink_action",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_response: {
          name: "spectralink_response",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_color: {
          name: "spectralink_color",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_alerttone: {
          name: "spectralink_alerttone",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_alertvolume: {
          name: "spectralink_alertvolume",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_alerttimeout: {
          name: "spectralink_alerttimeout",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_callback: {
          name: "spectralink_callback",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        action_config_identifier: {
          name: "action_config_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    action_config_spectralink_to_group_spectralink_group: {
      __meta: {
        name: "action_config_spectralink_to_group_spectralink_group",
        schema: "public",
      },
      fields: {
        action_config_spectralink_to_group_identifier: {
          name: "action_config_spectralink_to_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_group_identifier: {
          name: "spectralink_group_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    activity: {
      __meta: {
        name: "activity",
        schema: "public",
      },
      fields: {
        active: {
          name: "active",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        crew_identifier: {
          name: "crew_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        role_identifier: {
          name: "role_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        position: {
          name: "position",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    address: {
      __meta: {
        name: "address",
        schema: "public",
      },
      fields: {
        address: {
          name: "address",
          type: { kind: "scalar", name: { name: "text" } },
        },
        street_number: {
          name: "street_number",
          type: { kind: "scalar", name: { name: "text" } },
        },
        city: {
          name: "city",
          type: { kind: "scalar", name: { name: "text" } },
        },
        zip_code: {
          name: "zip_code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        country: {
          name: "country",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        contact_identifier: {
          name: "contact_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    administration_contact: {
      __meta: {
        name: "administration_contact",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        first_name: {
          name: "first_name",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        telephone: {
          name: "telephone",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        telephone2: {
          name: "telephone2",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        gsm: {
          name: "gsm",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        fax: {
          name: "fax",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        email: {
          name: "email",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        website: {
          name: "website",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    allergy: {
      __meta: {
        name: "allergy",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    api_login: {
      __meta: {
        name: "api_login",
        schema: "public",
      },
      fields: {
        login_identifier: {
          name: "login_identifier",
          type: { kind: "scalar", name: { name: "text" } },
        },
        password: {
          name: "password",
          type: { kind: "scalar", name: { name: "text" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        process_identifier: {
          name: "process_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        management_account_identifier: {
          name: "management_account_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        device_identifier: {
          name: "device_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    api_token: {
      __meta: {
        name: "api_token",
        schema: "public",
      },
      fields: {
        token: {
          name: "token",
          type: { kind: "scalar", name: { name: "text" } },
        },
        profile: {
          name: "profile",
          type: { kind: "scalar", name: { name: "text" } },
        },
        start_time: {
          name: "start_time",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        end_time: {
          name: "end_time",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        api_login_identifier: {
          name: "api_login_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    app_message: {
      __meta: {
        name: "app_message",
        schema: "public",
      },
      fields: {
        message: {
          name: "message",
          type: { kind: "scalar", name: { name: "text" } },
        },
        status: {
          name: "status",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        delete_status: {
          name: "delete_status",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        timestamp_sent: {
          name: "timestamp_sent",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        timestamp_delivered: {
          name: "timestamp_delivered",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        timestamp_man_ack: {
          name: "timestamp_man_ack",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        engine_call_action_message_identifier: {
          name: "engine_call_action_message_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        context_location_identifier: {
          name: "context_location_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        tag: {
          name: "tag",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    application_global: {
      __meta: {
        name: "application_global",
        schema: "public",
      },
      fields: {
        comfort_during_night: {
          name: "comfort_during_night",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        embezzlement_time: {
          name: "embezzlement_time",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        device_identifier: {
          name: "device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    application_svp: {
      __meta: {
        name: "application_svp",
        schema: "public",
      },
      fields: {
        view_in_screensaver: {
          name: "view_in_screensaver",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        pursuit_enabled: {
          name: "pursuit_enabled",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        device_identifier: {
          name: "device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        esvp_device_identifier: {
          name: "esvp_device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    appointment: {
      __meta: {
        name: "appointment",
        schema: "public",
      },
      fields: {
        start_date: {
          name: "start_date",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        end_date: {
          name: "end_date",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "text" } },
        },
        location: {
          name: "location",
          type: { kind: "scalar", name: { name: "text" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    badge: {
      __meta: {
        name: "badge",
        schema: "public",
      },
      fields: {
        serial: {
          name: "serial",
          type: { kind: "scalar", name: { name: "text" } },
        },
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        updated: {
          name: "updated",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        priority: {
          name: "priority",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    blood_type: {
      __meta: {
        name: "blood_type",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        rhesus: {
          name: "rhesus",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    bluetooth_device: {
      __meta: {
        name: "bluetooth_device",
        schema: "public",
      },
      fields: {
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    broadcast_call: {
      __meta: {
        name: "broadcast_call",
        schema: "public",
      },
      fields: {
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        sound: {
          name: "sound",
          type: { kind: "scalar", name: { name: "text" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    broadcast_call_group: {
      __meta: {
        name: "broadcast_call_group",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    call_reason: {
      __meta: {
        name: "call_reason",
        schema: "public",
      },
      fields: {
        tag: { name: "tag", type: { kind: "scalar", name: { name: "text" } } },
        created_at: {
          name: "created_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        source: {
          name: "source",
          type: { kind: "scalar", name: { name: "text" } },
        },
        comment: {
          name: "comment",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        call_reason_category_identifier: {
          name: "call_reason_category_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        location_identifier: {
          name: "location_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    call_reason_category: {
      __meta: {
        name: "call_reason_category",
        schema: "public",
      },
      fields: {
        prefix: {
          name: "prefix",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "call_reason_category_type" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    callback_queue: {
      __meta: {
        name: "callback_queue",
        schema: "public",
      },
      fields: {
        callback_category: {
          name: "callback_category",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "callback_category" } },
          },
        },
        location_call_callback_identifier: {
          name: "location_call_callback_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        url: { name: "url", type: { kind: "scalar", name: { name: "text" } } },
        headers: {
          name: "headers",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "jsonb" } },
          },
        },
        body: {
          name: "body",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "jsonb" } },
          },
        },
        last_send: {
          name: "last_send",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        tries: {
          name: "tries",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        status: {
          name: "status",
          type: { kind: "scalar", name: { name: "callback_status" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    camera: {
      __meta: {
        name: "camera",
        schema: "public",
      },
      fields: {
        location: {
          name: "location",
          type: { kind: "scalar", name: { name: "text" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    care: {
      __meta: {
        name: "care",
        schema: "public",
      },
      fields: {
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        state: {
          name: "state",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        state_cause_identifier: {
          name: "state_cause_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        status_identifier: {
          name: "status_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    care_action: {
      __meta: {
        name: "care_action",
        schema: "public",
      },
      fields: {
        groupname: {
          name: "groupname",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        plannedonly: {
          name: "plannedonly",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        authorization_type: {
          name: "authorization_type",
          type: { kind: "scalar", name: { name: "authorization_type" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    care_action_signature: {
      __meta: {
        name: "care_action_signature",
        schema: "public",
      },
      fields: {
        utc_timestamp: {
          name: "utc_timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        care_action_identifier: {
          name: "care_action_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        done: {
          name: "done",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        reason_notdone: {
          name: "reason_notdone",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        planned_care_action_identifier: {
          name: "planned_care_action_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        remarks: {
          name: "remarks",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        synced_on: {
          name: "synced_on",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    care_session: {
      __meta: {
        name: "care_session",
        schema: "public",
      },
      fields: {
        endpoint: {
          name: "endpoint",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        timestamp_enter: {
          name: "timestamp_enter",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        timestamp_leave: {
          name: "timestamp_leave",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        locked: {
          name: "locked",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        care_identifier: {
          name: "care_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    com_port: {
      __meta: {
        name: "com_port",
        schema: "public",
      },
      fields: {
        port: {
          name: "port",
          type: { kind: "scalar", name: { name: "text" } },
        },
        baudrate: {
          name: "baudrate",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        parity: {
          name: "parity",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        databits: {
          name: "databits",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        stopbits: {
          name: "stopbits",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        active: {
          name: "active",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        control_station: {
          name: "control_station",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        local_address: {
          name: "local_address",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        remote_address: {
          name: "remote_address",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        support_sync_for_poll: {
          name: "support_sync_for_poll",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        support_remote_management: {
          name: "support_remote_management",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        support_message_identifier: {
          name: "support_message_identifier",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        support_running_number: {
          name: "support_running_number",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        distributed_messaging_delay: {
          name: "distributed_messaging_delay",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        expire_message_after: {
          name: "expire_message_after",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    contact: {
      __meta: {
        name: "contact",
        schema: "public",
      },
      fields: {
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        webrtc_account_identifier: {
          name: "webrtc_account_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        contact_list_identifier: {
          name: "contact_list_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    contact_list: {
      __meta: {
        name: "contact_list",
        schema: "public",
      },
      fields: {
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        crew_identifier: {
          name: "crew_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    crew: {
      __meta: {
        name: "crew",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    day_night: {
      __meta: {
        name: "day_night",
        schema: "public",
      },
      fields: {
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "text" } },
        },
        remarks: {
          name: "remarks",
          type: { kind: "scalar", name: { name: "text" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        period_identifier: {
          name: "period_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    dect_account: {
      __meta: {
        name: "dect_account",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        number: {
          name: "number",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    dect_group: {
      __meta: {
        name: "dect_group",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    dect_message: {
      __meta: {
        name: "dect_message",
        schema: "public",
      },
      fields: {
        message: {
          name: "message",
          type: { kind: "scalar", name: { name: "text" } },
        },
        beep: {
          name: "beep",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        priority: {
          name: "priority",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        status: {
          name: "status",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        delete_status: {
          name: "delete_status",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        timestamp_sent: {
          name: "timestamp_sent",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        timestamp_delivered: {
          name: "timestamp_delivered",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        timestamp_man_ack: {
          name: "timestamp_man_ack",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        engine_call_action_message_identifier: {
          name: "engine_call_action_message_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        account_identifier: {
          name: "account_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        callback_account_identifier: {
          name: "callback_account_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        created_at: {
          name: "created_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        scheduled_at: {
          name: "scheduled_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        expired_at: {
          name: "expired_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        context_location_identifier: {
          name: "context_location_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        tag: {
          name: "tag",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    dect_message_queue: {
      __meta: {
        name: "dect_message_queue",
        schema: "public",
      },
      fields: {
        guid: {
          name: "guid",
          type: { kind: "scalar", name: { name: "text" } },
        },
        engine_event_identifier: {
          name: "engine_event_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        message: {
          name: "message",
          type: { kind: "scalar", name: { name: "text" } },
        },
        beep: {
          name: "beep",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        priority: {
          name: "priority",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        number: {
          name: "number",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        created_at: {
          name: "created_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        sent_at: {
          name: "sent_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        delivered_at: {
          name: "delivered_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        man_ack_at: {
          name: "man_ack_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        deleted: {
          name: "deleted",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        deletion_sent_at: {
          name: "deletion_sent_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        deletion_confirmed_at: {
          name: "deletion_confirmed_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    default_text: {
      __meta: {
        name: "default_text",
        schema: "public",
      },
      fields: {
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    dementia: {
      __meta: {
        name: "dementia",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    department: {
      __meta: {
        name: "department",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        site_identifier: {
          name: "site_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    device: {
      __meta: {
        name: "device",
        schema: "public",
      },
      fields: {
        serial: {
          name: "serial",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        verklizan_location_identifier: {
          name: "verklizan_location_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        badge_mode: {
          name: "badge_mode",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        application: {
          name: "application",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        engine_device_configuration_profile_identifier: {
          name: "engine_device_configuration_profile_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        verklizan_identifier: {
          name: "verklizan_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        application_parameters: {
          name: "application_parameters",
          type: { kind: "scalar", name: { name: "jsonb" } },
        },
        viedome_identifier: {
          name: "viedome_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        use_newui: {
          name: "use_newui",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "boolean" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    device_status: {
      __meta: {
        name: "device_status",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        state_machine: {
          name: "state_machine",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        state_identifier: {
          name: "state_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        device_only: {
          name: "device_only",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    diary: {
      __meta: {
        name: "diary",
        schema: "public",
      },
      fields: {
        description: {
          name: "description",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        remarks: {
          name: "remarks",
          type: { kind: "scalar", name: { name: "text" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        username: {
          name: "username",
          type: { kind: "scalar", name: { name: "text" } },
        },
        created: {
          name: "created",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        synced_on: {
          name: "synced_on",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    diary_patient: {
      __meta: {
        name: "diary_patient",
        schema: "public",
      },
      fields: {
        diary_identifier: {
          name: "diary_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    door_procedure: {
      __meta: {
        name: "door_procedure",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        functionality: {
          name: "functionality",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    email: {
      __meta: {
        name: "email",
        schema: "public",
      },
      fields: {
        address: {
          name: "address",
          type: { kind: "scalar", name: { name: "text" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        role_identifier: {
          name: "role_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        crew_identifier: {
          name: "crew_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        possible_work_order_top_identifier: {
          name: "possible_work_order_top_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    employee: {
      __meta: {
        name: "employee",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        avatar: {
          name: "avatar",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        dect_account_identifier: {
          name: "dect_account_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        fcm_account_identifier: {
          name: "fcm_account_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        cms_code_one: {
          name: "cms_code_one",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        cms_code_two: {
          name: "cms_code_two",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        cms: { name: "cms", type: { kind: "scalar", name: { name: "text" } } },
        spectralink_account_identifier: {
          name: "spectralink_account_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        cas_language: {
          name: "cas_language",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        cas_user: {
          name: "cas_user",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        cas_password: {
          name: "cas_password",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        cas_permissions: {
          name: "cas_permissions",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "jsonb" } },
          },
        },
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_action: {
      __meta: {
        name: "engine_action",
        schema: "public",
      },
      fields: {
        action: {
          name: "action",
          type: { kind: "scalar", name: { name: "text" } },
        },
        engine_call_termination_identifier: {
          name: "engine_call_termination_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_viewpoint_notification_acknowledgment_identi: {
          name:
            "engine_call_action_viewpoint_notification_acknowledgment_identi",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_viewpoint_notification_termination_identifie: {
          name:
            "engine_call_action_viewpoint_notification_termination_identifie",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_viewpoint_status_acknowledgment_identifier: {
          name: "engine_call_action_viewpoint_status_acknowledgment_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_viewpoint_status_termination_identifier: {
          name: "engine_call_action_viewpoint_status_termination_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_message_acknowledgment_identifier: {
          name: "engine_call_action_message_acknowledgment_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_message_rejection_identifier: {
          name: "engine_call_action_message_rejection_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_message_termination_identifier: {
          name: "engine_call_action_message_termination_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_message_destination_employee_identifier: {
          name: "engine_call_action_message_destination_employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_message_destination_dect_identifier: {
          name: "engine_call_action_message_destination_dect_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_message_destination_email_identifier: {
          name: "engine_call_action_message_destination_email_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_message_destination_spectralink_identifier: {
          name: "engine_call_action_message_destination_spectralink_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_call: {
      __meta: {
        name: "engine_call",
        schema: "public",
      },
      fields: {
        xtag: {
          name: "xtag",
          type: { kind: "scalar", name: { name: "text" } },
        },
        timestamp_requested: {
          name: "timestamp_requested",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        timestamp_expired: {
          name: "timestamp_expired",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        timestamp_executed: {
          name: "timestamp_executed",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_call_action: {
      __meta: {
        name: "engine_call_action",
        schema: "public",
      },
      fields: {
        timestamp_requested: {
          name: "timestamp_requested",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        timestamp_executed: {
          name: "timestamp_executed",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        timestamp_processed: {
          name: "timestamp_processed",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        engine_call_action_viewpoint_notification_identifier: {
          name: "engine_call_action_viewpoint_notification_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_viewpoint_status_identifier: {
          name: "engine_call_action_viewpoint_status_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_message_identifier: {
          name: "engine_call_action_message_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_identifier: {
          name: "engine_call_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_call_action_message: {
      __meta: {
        name: "engine_call_action_message",
        schema: "public",
      },
      fields: {
        text: {
          name: "text",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_call_action_message_app: {
      __meta: {
        name: "engine_call_action_message_app",
        schema: "public",
      },
      fields: {
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_call_action_message_dect: {
      __meta: {
        name: "engine_call_action_message_dect",
        schema: "public",
      },
      fields: {
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        priority: {
          name: "priority",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        beep: {
          name: "beep",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_call_action_message_destination_dect: {
      __meta: {
        name: "engine_call_action_message_destination_dect",
        schema: "public",
      },
      fields: {
        dect_group: {
          name: "dect_group",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        engine_call_action_message_identifier: {
          name: "engine_call_action_message_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        location_identifier: {
          name: "location_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        dect_account_identifier: {
          name: "dect_account_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        settings_identifier: {
          name: "settings_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_call_action_message_destination_email: {
      __meta: {
        name: "engine_call_action_message_destination_email",
        schema: "public",
      },
      fields: {
        crew_identifier: {
          name: "crew_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        location_identifier: {
          name: "location_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        engine_call_action_message_identifier: {
          name: "engine_call_action_message_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        active: {
          name: "active",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        settings_identifier: {
          name: "settings_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_call_action_message_destination_employee: {
      __meta: {
        name: "engine_call_action_message_destination_employee",
        schema: "public",
      },
      fields: {
        engine_call_action_message_identifier: {
          name: "engine_call_action_message_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        location_identifier: {
          name: "location_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        crew_identifier: {
          name: "crew_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        active: {
          name: "active",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        settings_email_identifier: {
          name: "settings_email_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        settings_app_identifier: {
          name: "settings_app_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        settings_dect_identifier: {
          name: "settings_dect_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        settings_spectralink_identifier: {
          name: "settings_spectralink_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_call_action_message_destination_spectralink: {
      __meta: {
        name: "engine_call_action_message_destination_spectralink",
        schema: "public",
      },
      fields: {
        spectralink_group: {
          name: "spectralink_group",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        engine_call_action_message_identifier: {
          name: "engine_call_action_message_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        location_identifier: {
          name: "location_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        spectralink_account_identifier: {
          name: "spectralink_account_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        settings_identifier: {
          name: "settings_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_call_action_message_email: {
      __meta: {
        name: "engine_call_action_message_email",
        schema: "public",
      },
      fields: {
        title: {
          name: "title",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_call_action_message_spectralink: {
      __meta: {
        name: "engine_call_action_message_spectralink",
        schema: "public",
      },
      fields: {
        action: {
          name: "action",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        response: {
          name: "response",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        repeat: {
          name: "repeat",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        led: {
          name: "led",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        icon: {
          name: "icon",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        color: {
          name: "color",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        setup: {
          name: "setup",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        alerttone: {
          name: "alerttone",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        alertpattern: {
          name: "alertpattern",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        alertvolume: {
          name: "alertvolume",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        alerttimeout: {
          name: "alerttimeout",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        displaytimeout: {
          name: "displaytimeout",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        callback: {
          name: "callback",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_call_action_viewpoint_notification: {
      __meta: {
        name: "engine_call_action_viewpoint_notification",
        schema: "public",
      },
      fields: {
        text: {
          name: "text",
          type: { kind: "scalar", name: { name: "text" } },
        },
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        status_identifier: {
          name: "status_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        notification_identifier: {
          name: "notification_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_call_action_viewpoint_status: {
      __meta: {
        name: "engine_call_action_viewpoint_status",
        schema: "public",
      },
      fields: {
        cause_identifier: {
          name: "cause_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        status_identifier: {
          name: "status_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_device_configuration_profile: {
      __meta: {
        name: "engine_device_configuration_profile",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        crc: {
          name: "crc",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        configuration: {
          name: "configuration",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_event: {
      __meta: {
        name: "engine_event",
        schema: "public",
      },
      fields: {
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        badge_provided_identifier: {
          name: "badge_provided_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        badge_provisioned_identifier: {
          name: "badge_provisioned_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        rf_module_provided_identifier: {
          name: "rf_module_provided_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        access_entered_identifier: {
          name: "access_entered_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        access_left_identifier: {
          name: "access_left_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        access_denied_identifier: {
          name: "access_denied_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        viewpoint_state_changed_identifier: {
          name: "viewpoint_state_changed_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_event_access_denied: {
      __meta: {
        name: "engine_event_access_denied",
        schema: "public",
      },
      fields: {
        session_identifier: {
          name: "session_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_event_access_entered: {
      __meta: {
        name: "engine_event_access_entered",
        schema: "public",
      },
      fields: {
        session_identifier: {
          name: "session_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_event_access_left: {
      __meta: {
        name: "engine_event_access_left",
        schema: "public",
      },
      fields: {
        session_identifier: {
          name: "session_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_event_badge_provided: {
      __meta: {
        name: "engine_event_badge_provided",
        schema: "public",
      },
      fields: {
        device_identifier: {
          name: "device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        badge_identifier: {
          name: "badge_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_event_badge_provisioned: {
      __meta: {
        name: "engine_event_badge_provisioned",
        schema: "public",
      },
      fields: {
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        badge_identifier: {
          name: "badge_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_event_rf_module_provided: {
      __meta: {
        name: "engine_event_rf_module_provided",
        schema: "public",
      },
      fields: {
        device_identifier: {
          name: "device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        rf_module_identifier: {
          name: "rf_module_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_event_viewpoint_state_changed: {
      __meta: {
        name: "engine_event_viewpoint_state_changed",
        schema: "public",
      },
      fields: {
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    engine_server_configuration_profile: {
      __meta: {
        name: "engine_server_configuration_profile",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        configuration: {
          name: "configuration",
          type: { kind: "scalar", name: { name: "text" } },
        },
        active: {
          name: "active",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    espa_in_message: {
      __meta: {
        name: "espa_in_message",
        schema: "public",
      },
      fields: {
        timestamp_requested: {
          name: "timestamp_requested",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        timestamp_executed: {
          name: "timestamp_executed",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        message: {
          name: "message",
          type: { kind: "scalar", name: { name: "text" } },
        },
        beep: {
          name: "beep",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        address: {
          name: "address",
          type: { kind: "scalar", name: { name: "text" } },
        },
        call_type: {
          name: "call_type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        priority: {
          name: "priority",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        com_port_identifier: {
          name: "com_port_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    fcm_account: {
      __meta: {
        name: "fcm_account",
        schema: "public",
      },
      fields: {
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        timestamp_created: {
          name: "timestamp_created",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        timestamp_verified: {
          name: "timestamp_verified",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    general_practitioner: {
      __meta: {
        name: "general_practitioner",
        schema: "public",
      },
      fields: {
        rziv: {
          name: "rziv",
          type: { kind: "scalar", name: { name: "text" } },
        },
        active: {
          name: "active",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        administration_contact_identifier: {
          name: "administration_contact_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    gps_signal: {
      __meta: {
        name: "gps_signal",
        schema: "public",
      },
      fields: {
        longitude: {
          name: "longitude",
          type: { kind: "scalar", name: { name: "numeric" } },
        },
        latitude: {
          name: "latitude",
          type: { kind: "scalar", name: { name: "numeric" } },
        },
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "text" } },
        },
        created: {
          name: "created",
          type: {
            kind: "scalar",
            name: { name: "timestamp without time zone" },
          },
        },
        trusted_device_identifier: {
          name: "trusted_device_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        remote_alarm_identifier: {
          name: "remote_alarm_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        address_identifier: {
          name: "address_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    heartbeat: {
      __meta: {
        name: "heartbeat",
        schema: "public",
      },
      fields: {
        mac_address: {
          name: "mac_address",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        last_ip_address: {
          name: "last_ip_address",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        utc_timestamp_lastseen: {
          name: "utc_timestamp_lastseen",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        utc_timestamp_lastboot: {
          name: "utc_timestamp_lastboot",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "heartbeat_type" } },
        },
        tag: {
          name: "tag",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    hulp_call: {
      __meta: {
        name: "hulp_call",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        priority: {
          name: "priority",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        webrtc_account_identifier: {
          name: "webrtc_account_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    image: {
      __meta: {
        name: "image",
        schema: "public",
      },
      fields: {
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        url: { name: "url", type: { kind: "scalar", name: { name: "text" } } },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "text" } },
        },
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    lifeline_message: {
      __meta: {
        name: "lifeline_message",
        schema: "public",
      },
      fields: {
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    lifeline_message_answer: {
      __meta: {
        name: "lifeline_message_answer",
        schema: "public",
      },
      fields: {
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        lifeline_message_identifier: {
          name: "lifeline_message_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        lifeline_message_button_identifier: {
          name: "lifeline_message_button_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    lifeline_message_button: {
      __meta: {
        name: "lifeline_message_button",
        schema: "public",
      },
      fields: {
        text: {
          name: "text",
          type: { kind: "scalar", name: { name: "text" } },
        },
        color: {
          name: "color",
          type: { kind: "scalar", name: { name: "text" } },
        },
        lifeline_message_identifier: {
          name: "lifeline_message_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    locality: {
      __meta: {
        name: "locality",
        schema: "public",
      },
      fields: {
        rssi: {
          name: "rssi",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        rf_module_identifier: {
          name: "rf_module_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        device_identifier: {
          name: "device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    location: {
      __meta: {
        name: "location",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        manual_ack_possible: {
          name: "manual_ack_possible",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        timezone: {
          name: "timezone",
          type: { kind: "scalar", name: { name: "text" } },
        },
        department_identifier: {
          name: "department_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        care_identifier: {
          name: "care_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        serial: {
          name: "serial",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    location_call: {
      __meta: {
        name: "location_call",
        schema: "public",
      },
      fields: {
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        started: {
          name: "started",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        ended: {
          name: "ended",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        current_status_identifier: {
          name: "current_status_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        call_reason_category_identifier: {
          name: "call_reason_category_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        call_reason_comments: {
          name: "call_reason_comments",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        call_reason_employee_identifier: {
          name: "call_reason_employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    location_call_callback: {
      __meta: {
        name: "location_call_callback",
        schema: "public",
      },
      fields: {
        location_call_identifier: {
          name: "location_call_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        url: { name: "url", type: { kind: "scalar", name: { name: "text" } } },
        headers: {
          name: "headers",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "jsonb" } },
          },
        },
        on_create: {
          name: "on_create",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        on_update: {
          name: "on_update",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        on_close: {
          name: "on_close",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    location_call_employee_presence: {
      __meta: {
        name: "location_call_employee_presence",
        schema: "public",
      },
      fields: {
        location_call_identifier: {
          name: "location_call_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        timestamp_enter: {
          name: "timestamp_enter",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        timestamp_leave: {
          name: "timestamp_leave",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    location_call_patient_in_location: {
      __meta: {
        name: "location_call_patient_in_location",
        schema: "public",
      },
      fields: {
        location_call_identifier: {
          name: "location_call_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    location_call_state_change: {
      __meta: {
        name: "location_call_state_change",
        schema: "public",
      },
      fields: {
        location_call_identifier: {
          name: "location_call_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        status_identifier: {
          name: "status_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        source: {
          name: "source",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "call_source" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    log: {
      __meta: {
        name: "log",
        schema: "public",
      },
      fields: {
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        category: {
          name: "category",
          type: { kind: "scalar", name: { name: "text" } },
        },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "text" } },
        },
        parameters: {
          name: "parameters",
          type: { kind: "scalar", name: { name: "text" } },
        },
        site_identifier: {
          name: "site_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    log_care: {
      __meta: {
        name: "log_care",
        schema: "public",
      },
      fields: {
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        period: {
          name: "period",
          type: { kind: "scalar", name: { name: "tstzrange" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
      },
    },
    log_door: {
      __meta: {
        name: "log_door",
        schema: "public",
      },
      fields: {
        access_door_identifier: {
          name: "access_door_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    log_duty: {
      __meta: {
        name: "log_duty",
        schema: "public",
      },
      fields: {
        crew_identifier: {
          name: "crew_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        role_identifier: {
          name: "role_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        period: {
          name: "period",
          type: { kind: "scalar", name: { name: "tstzrange" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
      },
    },
    log_employee_dect_account: {
      __meta: {
        name: "log_employee_dect_account",
        schema: "public",
      },
      fields: {
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        dect_account_identifier: {
          name: "dect_account_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        period: {
          name: "period",
          type: { kind: "scalar", name: { name: "tstzrange" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
      },
    },
    log_employee_spectralink_account: {
      __meta: {
        name: "log_employee_spectralink_account",
        schema: "public",
      },
      fields: {
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        spectralink_account_identifier: {
          name: "spectralink_account_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        period: {
          name: "period",
          type: { kind: "scalar", name: { name: "tstzrange" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
      },
    },
    log_engine_context_device: {
      __meta: {
        name: "log_engine_context_device",
        schema: "public",
      },
      fields: {
        tag: { name: "tag", type: { kind: "scalar", name: { name: "text" } } },
        state: {
          name: "state",
          type: { kind: "scalar", name: { name: "text" } },
        },
        parameters: {
          name: "parameters",
          type: { kind: "scalar", name: { name: "jsonb" } },
        },
        entered_at: {
          name: "entered_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        device_identifier: {
          name: "device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    log_engine_context_location: {
      __meta: {
        name: "log_engine_context_location",
        schema: "public",
      },
      fields: {
        tag: { name: "tag", type: { kind: "scalar", name: { name: "text" } } },
        state: {
          name: "state",
          type: { kind: "scalar", name: { name: "text" } },
        },
        parameters: {
          name: "parameters",
          type: { kind: "scalar", name: { name: "jsonb" } },
        },
        entered_at: {
          name: "entered_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    log_engine_context_patient: {
      __meta: {
        name: "log_engine_context_patient",
        schema: "public",
      },
      fields: {
        tag: { name: "tag", type: { kind: "scalar", name: { name: "text" } } },
        state: {
          name: "state",
          type: { kind: "scalar", name: { name: "text" } },
        },
        parameters: {
          name: "parameters",
          type: { kind: "scalar", name: { name: "jsonb" } },
        },
        entered_at: {
          name: "entered_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    log_location_patient: {
      __meta: {
        name: "log_location_patient",
        schema: "public",
      },
      fields: {
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        period: {
          name: "period",
          type: { kind: "scalar", name: { name: "tstzrange" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
      },
    },
    log_patient_cas_mode: {
      __meta: {
        name: "log_patient_cas_mode",
        schema: "public",
      },
      fields: {
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        period: {
          name: "period",
          type: { kind: "scalar", name: { name: "tstzrange" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
      },
    },
    log_status: {
      __meta: {
        name: "log_status",
        schema: "public",
      },
      fields: {
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        status_identifier: {
          name: "status_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
      },
    },
    management_account: {
      __meta: {
        name: "management_account",
        schema: "public",
      },
      fields: {
        email: {
          name: "email",
          type: { kind: "scalar", name: { name: "text" } },
        },
        flag: {
          name: "flag",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    management_department: {
      __meta: {
        name: "management_department",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "text" } },
        },
        site_identifier: {
          name: "site_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    management_device: {
      __meta: {
        name: "management_device",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        serial: {
          name: "serial",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        end_of_line_a: {
          name: "end_of_line_a",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        end_of_line_b: {
          name: "end_of_line_b",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "text" } },
        },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "text" } },
        },
        server_identifier: {
          name: "server_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        room_identifier: {
          name: "room_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    management_device_update: {
      __meta: {
        name: "management_device_update",
        schema: "public",
      },
      fields: {
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        end_of_line_a: {
          name: "end_of_line_a",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        end_of_line_b: {
          name: "end_of_line_b",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        serial: {
          name: "serial",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        account_identifier: {
          name: "account_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        server_identifier: {
          name: "server_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        site_identifier: {
          name: "site_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        device_identifier: {
          name: "device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    management_room: {
      __meta: {
        name: "management_room",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "text" } },
        },
        department_identifier: {
          name: "department_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    management_server: {
      __meta: {
        name: "management_server",
        schema: "public",
      },
      fields: {
        server_name: {
          name: "server_name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        server_code: {
          name: "server_code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        server_device_address: {
          name: "server_device_address",
          type: { kind: "scalar", name: { name: "text" } },
        },
        server_public_address: {
          name: "server_public_address",
          type: { kind: "scalar", name: { name: "text" } },
        },
        server_private_address: {
          name: "server_private_address",
          type: { kind: "scalar", name: { name: "text" } },
        },
        endpoint_websocket: {
          name: "endpoint_websocket",
          type: { kind: "scalar", name: { name: "text" } },
        },
        endpoint_engine: {
          name: "endpoint_engine",
          type: { kind: "scalar", name: { name: "text" } },
        },
        endpoint_api: {
          name: "endpoint_api",
          type: { kind: "scalar", name: { name: "text" } },
        },
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    management_site: {
      __meta: {
        name: "management_site",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_bloodpressure: {
      __meta: {
        name: "measurement_bloodpressure",
        schema: "public",
      },
      fields: {
        upper: {
          name: "upper",
          type: { kind: "scalar", name: { name: "real" } },
        },
        lower: {
          name: "lower",
          type: { kind: "scalar", name: { name: "real" } },
        },
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        context_value: {
          name: "context_value",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "bloodpressure_context_value" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_bloodsample: {
      __meta: {
        name: "measurement_bloodsample",
        schema: "public",
      },
      fields: {
        value: {
          name: "value",
          type: { kind: "scalar", name: { name: "real" } },
        },
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        kind: {
          name: "kind",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "bloodsample_kind" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_glycemia: {
      __meta: {
        name: "measurement_glycemia",
        schema: "public",
      },
      fields: {
        value: {
          name: "value",
          type: { kind: "scalar", name: { name: "real" } },
        },
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        context_value: {
          name: "context_value",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "glycemia_context_value" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_length: {
      __meta: {
        name: "measurement_length",
        schema: "public",
      },
      fields: {
        value: {
          name: "value",
          type: { kind: "scalar", name: { name: "real" } },
        },
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_morsefallscale: {
      __meta: {
        name: "measurement_morsefallscale",
        schema: "public",
      },
      fields: {
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        history_of_falling: {
          name: "history_of_falling",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        secondary_diagnosis: {
          name: "secondary_diagnosis",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        ambulatory_aid: {
          name: "ambulatory_aid",
          type: {
            kind: "scalar",
            name: { name: "morsefallscale_ambulatoryaid_answer" },
          },
        },
        iv_heparin_lock: {
          name: "iv_heparin_lock",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        gait: {
          name: "gait",
          type: {
            kind: "scalar",
            name: { name: "morsefallscale_gait_answer" },
          },
        },
        mental_status: {
          name: "mental_status",
          type: {
            kind: "scalar",
            name: { name: "morsefallscale_mentalstatus_answer" },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_oxygensaturation: {
      __meta: {
        name: "measurement_oxygensaturation",
        schema: "public",
      },
      fields: {
        value: {
          name: "value",
          type: { kind: "scalar", name: { name: "real" } },
        },
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_pulse: {
      __meta: {
        name: "measurement_pulse",
        schema: "public",
      },
      fields: {
        value: {
          name: "value",
          type: { kind: "scalar", name: { name: "real" } },
        },
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        context_value: {
          name: "context_value",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "pulse_context_value" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_signature: {
      __meta: {
        name: "measurement_signature",
        schema: "public",
      },
      fields: {
        measurement_type: {
          name: "measurement_type",
          type: { kind: "scalar", name: { name: "measurement_type" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        planned_measurement_identifier: {
          name: "planned_measurement_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        utc_timestamp: {
          name: "utc_timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        reason_notdone: {
          name: "reason_notdone",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        done: {
          name: "done",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        synced_on: {
          name: "synced_on",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_stoolrecord: {
      __meta: {
        name: "measurement_stoolrecord",
        schema: "public",
      },
      fields: {
        value: {
          name: "value",
          type: { kind: "scalar", name: { name: "real" } },
        },
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        context_value: {
          name: "context_value",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "stoolrecord_context_value" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_temperature: {
      __meta: {
        name: "measurement_temperature",
        schema: "public",
      },
      fields: {
        value: {
          name: "value",
          type: { kind: "scalar", name: { name: "real" } },
        },
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_urineoutput: {
      __meta: {
        name: "measurement_urineoutput",
        schema: "public",
      },
      fields: {
        value: {
          name: "value",
          type: { kind: "scalar", name: { name: "real" } },
        },
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        context_value: {
          name: "context_value",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "urineoutput_context_value" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_visualpainscale: {
      __meta: {
        name: "measurement_visualpainscale",
        schema: "public",
      },
      fields: {
        value: {
          name: "value",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_waterlowscale: {
      __meta: {
        name: "measurement_waterlowscale",
        schema: "public",
      },
      fields: {
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        build_height: {
          name: "build_height",
          type: {
            kind: "scalar",
            name: { name: "waterlowscale_build_height_answer" },
          },
        },
        skintype: {
          name: "skintype",
          type: {
            kind: "array",
            subtype: "array",
            typevar: {
              kind: "scalar",
              name: { name: "waterlowscale_skintype_answer" },
            },
          },
        },
        gender: {
          name: "gender",
          type: {
            kind: "scalar",
            name: { name: "waterlowscale_gender_answer" },
          },
        },
        agerange: {
          name: "agerange",
          type: {
            kind: "scalar",
            name: { name: "waterlowscale_agerange_answer" },
          },
        },
        specialrisks: {
          name: "specialrisks",
          type: {
            kind: "array",
            subtype: "array",
            typevar: {
              kind: "scalar",
              name: { name: "waterlowscale_specialrisks_answer" },
            },
          },
        },
        continence: {
          name: "continence",
          type: {
            kind: "array",
            subtype: "array",
            typevar: {
              kind: "scalar",
              name: { name: "waterlowscale_continence_answer" },
            },
          },
        },
        mobility: {
          name: "mobility",
          type: {
            kind: "array",
            subtype: "array",
            typevar: {
              kind: "scalar",
              name: { name: "waterlowscale_mobility_answer" },
            },
          },
        },
        apetite: {
          name: "apetite",
          type: {
            kind: "scalar",
            name: { name: "waterlowscale_apetite_answer" },
          },
        },
        neurological_disorders: {
          name: "neurological_disorders",
          type: {
            kind: "array",
            subtype: "array",
            typevar: {
              kind: "scalar",
              name: { name: "waterlowscale_neurological_disorders_answer" },
            },
          },
        },
        extensive_surgery: {
          name: "extensive_surgery",
          type: {
            kind: "array",
            subtype: "array",
            typevar: {
              kind: "scalar",
              name: { name: "waterlowscale_extensive_surgery_answer" },
            },
          },
        },
        medications: {
          name: "medications",
          type: {
            kind: "array",
            subtype: "array",
            typevar: {
              kind: "scalar",
              name: { name: "waterlowscale_medications_answer" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    measurement_weight: {
      __meta: {
        name: "measurement_weight",
        schema: "public",
      },
      fields: {
        value: {
          name: "value",
          type: { kind: "scalar", name: { name: "real" } },
        },
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    medication: {
      __meta: {
        name: "medication",
        schema: "public",
      },
      fields: {
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "text" } },
        },
        medication_form_identifier: {
          name: "medication_form_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    medication_form: {
      __meta: {
        name: "medication_form",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    medication_signature: {
      __meta: {
        name: "medication_signature",
        schema: "public",
      },
      fields: {
        utc_timestamp: {
          name: "utc_timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        planned_medication_identifier: {
          name: "planned_medication_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        done: {
          name: "done",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        reason_notdone: {
          name: "reason_notdone",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        phase: {
          name: "phase",
          type: { kind: "scalar", name: { name: "medication_phase" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        synced_on: {
          name: "synced_on",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    medication_signature_detail: {
      __meta: {
        name: "medication_signature_detail",
        schema: "public",
      },
      fields: {
        medication_signature_identifier: {
          name: "medication_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        medication_type_identifier: {
          name: "medication_type_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        dosage: {
          name: "dosage",
          type: { kind: "scalar", name: { name: "real" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    medication_type: {
      __meta: {
        name: "medication_type",
        schema: "public",
      },
      fields: {
        grouping: {
          name: "grouping",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        unit: {
          name: "unit",
          type: { kind: "scalar", name: { name: "text" } },
        },
        code: {
          name: "code",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    message: {
      __meta: {
        name: "message",
        schema: "public",
      },
      fields: {
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        message: {
          name: "message",
          type: { kind: "scalar", name: { name: "text" } },
        },
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        from_name: {
          name: "from_name",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        from_patient_identifier: {
          name: "from_patient_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        from_employee_identifier: {
          name: "from_employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        about_patient_identifier: {
          name: "about_patient_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        lifeline_message_identifier: {
          name: "lifeline_message_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection: {
      __meta: {
        name: "mis_connection",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "text" } },
        },
        definition: {
          name: "definition",
          type: { kind: "scalar", name: { name: "jsonb" } },
        },
        populated_at: {
          name: "populated_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_care_action: {
      __meta: {
        name: "mis_connection_care_action",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        care_action_identifier: {
          name: "care_action_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        external_identifier: {
          name: "external_identifier",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_care_action_signature: {
      __meta: {
        name: "mis_connection_care_action_signature",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        care_action_signature_identifier: {
          name: "care_action_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        external_identifier: {
          name: "external_identifier",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_department: {
      __meta: {
        name: "mis_connection_department",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        department_identifier: {
          name: "department_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identification: {
          name: "identification",
          type: { kind: "scalar", name: { name: "jsonb" } },
        },
        data: {
          name: "data",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "jsonb" } },
          },
        },
        mis_mode: {
          name: "mis_mode",
          type: { kind: "scalar", name: { name: "mis_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_diary: {
      __meta: {
        name: "mis_connection_diary",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        diary_identifier: {
          name: "diary_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        external_identifier: {
          name: "external_identifier",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_employee: {
      __meta: {
        name: "mis_connection_employee",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identification: {
          name: "identification",
          type: { kind: "scalar", name: { name: "jsonb" } },
        },
        data: {
          name: "data",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "jsonb" } },
          },
        },
        mis_mode: {
          name: "mis_mode",
          type: { kind: "scalar", name: { name: "mis_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_location: {
      __meta: {
        name: "mis_connection_location",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identification: {
          name: "identification",
          type: { kind: "scalar", name: { name: "jsonb" } },
        },
        data: {
          name: "data",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "jsonb" } },
          },
        },
        mis_mode: {
          name: "mis_mode",
          type: { kind: "scalar", name: { name: "mis_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_measurement_signature: {
      __meta: {
        name: "mis_connection_measurement_signature",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        measurement_signature_identifier: {
          name: "measurement_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        external_identifier: {
          name: "external_identifier",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_medication_signature: {
      __meta: {
        name: "mis_connection_medication_signature",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        medication_signature_identifier: {
          name: "medication_signature_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        external_identifier: {
          name: "external_identifier",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_medication_type: {
      __meta: {
        name: "mis_connection_medication_type",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        medication_type_identifier: {
          name: "medication_type_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        external_identifier: {
          name: "external_identifier",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_patient: {
      __meta: {
        name: "mis_connection_patient",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identification: {
          name: "identification",
          type: { kind: "scalar", name: { name: "jsonb" } },
        },
        data: {
          name: "data",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "jsonb" } },
          },
        },
        mis_mode: {
          name: "mis_mode",
          type: { kind: "scalar", name: { name: "mis_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_planned_care_action: {
      __meta: {
        name: "mis_connection_planned_care_action",
        schema: "public",
      },
      fields: {
        planned_care_action_identifier: {
          name: "planned_care_action_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        external_identifier: {
          name: "external_identifier",
          type: { kind: "scalar", name: { name: "text" } },
        },
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_planned_measurement: {
      __meta: {
        name: "mis_connection_planned_measurement",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        planned_measurement_identifier: {
          name: "planned_measurement_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        external_identifier: {
          name: "external_identifier",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_planned_medication: {
      __meta: {
        name: "mis_connection_planned_medication",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        planned_medication_identifier: {
          name: "planned_medication_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        external_identifier: {
          name: "external_identifier",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_section: {
      __meta: {
        name: "mis_connection_section",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        section_identifier: {
          name: "section_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identification: {
          name: "identification",
          type: { kind: "scalar", name: { name: "jsonb" } },
        },
        data: {
          name: "data",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "jsonb" } },
          },
        },
        mis_mode: {
          name: "mis_mode",
          type: { kind: "scalar", name: { name: "mis_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    mis_connection_site: {
      __meta: {
        name: "mis_connection_site",
        schema: "public",
      },
      fields: {
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        site_identifier: {
          name: "site_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identification: {
          name: "identification",
          type: { kind: "scalar", name: { name: "jsonb" } },
        },
        data: {
          name: "data",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "jsonb" } },
          },
        },
        mis_mode: {
          name: "mis_mode",
          type: { kind: "scalar", name: { name: "mis_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    monitor_status_device: {
      __meta: {
        name: "monitor_status_device",
        schema: "public",
      },
      fields: {
        device_identifier: {
          name: "device_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        utc_timestamp_lastboot: {
          name: "utc_timestamp_lastboot",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        utc_timestamp_lastboot_ui: {
          name: "utc_timestamp_lastboot_ui",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        utc_timestamp_lastcontact: {
          name: "utc_timestamp_lastcontact",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        utc_timestamp_lastcontact_ui: {
          name: "utc_timestamp_lastcontact_ui",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        utc_timestamp_lastupdate: {
          name: "utc_timestamp_lastupdate",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        processing_rmq_status: {
          name: "processing_rmq_status",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "monitor_rmq_status" } },
          },
        },
        overheat_status: {
          name: "overheat_status",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "monitor_heat_status" } },
          },
        },
        voice_status: {
          name: "voice_status",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "monitor_voice_status" } },
          },
        },
        last_known_ip: {
          name: "last_known_ip",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        last_known_ui_ip: {
          name: "last_known_ui_ip",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        mac_address: {
          name: "mac_address",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    monitor_status_server: {
      __meta: {
        name: "monitor_status_server",
        schema: "public",
      },
      fields: {
        host_name: {
          name: "host_name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        last_known_ip: {
          name: "last_known_ip",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        utc_timestamp_lastboot: {
          name: "utc_timestamp_lastboot",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        utc_timestamp_lastcontact: {
          name: "utc_timestamp_lastcontact",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        utc_timestamp_lastupdate: {
          name: "utc_timestamp_lastupdate",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        disk_space_gb_free: {
          name: "disk_space_gb_free",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "double" } },
          },
        },
        disk_space_percent_used: {
          name: "disk_space_percent_used",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        cpu_percent: {
          name: "cpu_percent",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        mem_gb_free: {
          name: "mem_gb_free",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "double" } },
          },
        },
        mem_percent_used: {
          name: "mem_percent_used",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    notification: {
      __meta: {
        name: "notification",
        schema: "public",
      },
      fields: {
        message: {
          name: "message",
          type: { kind: "scalar", name: { name: "text" } },
        },
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        state: {
          name: "state",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        status_identifier: {
          name: "status_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        tag: {
          name: "tag",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        acknowledged_at: {
          name: "acknowledged_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        deleted_at: {
          name: "deleted_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    organization: {
      __meta: {
        name: "organization",
        schema: "public",
      },
      fields: {
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        administration_contact_identifier: {
          name: "administration_contact_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    patient: {
      __meta: {
        name: "patient",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        first_name: {
          name: "first_name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        last_name: {
          name: "last_name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        sex: { name: "sex", type: { kind: "scalar", name: { name: "text" } } },
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        avatar: {
          name: "avatar",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        status: {
          name: "status",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_administration_information_identifier: {
          name: "patient_administration_information_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        patient_social_information_identifier: {
          name: "patient_social_information_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        patient_medical_information_identifier: {
          name: "patient_medical_information_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        section_identifier: {
          name: "section_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        room_identifier: {
          name: "room_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        middle_name: {
          name: "middle_name",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    patient_administration_information: {
      __meta: {
        name: "patient_administration_information",
        schema: "public",
      },
      fields: {
        nickname: {
          name: "nickname",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        birthdate: {
          name: "birthdate",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "date" } },
          },
        },
        birthplace: {
          name: "birthplace",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        marital_status: {
          name: "marital_status",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        nationality: {
          name: "nationality",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        national_insurance_number: {
          name: "national_insurance_number",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identity_card_number: {
          name: "identity_card_number",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        bank_account: {
          name: "bank_account",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        membership_number: {
          name: "membership_number",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        start_hospitalization: {
          name: "start_hospitalization",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "date" } },
          },
        },
        end_hospitalization: {
          name: "end_hospitalization",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "date" } },
          },
        },
        religion: {
          name: "religion",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        remarks: {
          name: "remarks",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        health_insurance_identifier: {
          name: "health_insurance_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        preferably_hospital_identifier: {
          name: "preferably_hospital_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        domicile_identifier: {
          name: "domicile_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        doctor_name: {
          name: "doctor_name",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        doctor_phone: {
          name: "doctor_phone",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    patient_contact: {
      __meta: {
        name: "patient_contact",
        schema: "public",
      },
      fields: {
        priority: {
          name: "priority",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        function: {
          name: "function",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        relation: {
          name: "relation",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        patient_administration_information_identifier: {
          name: "patient_administration_information_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        administration_contact_identifier: {
          name: "administration_contact_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    patient_group: {
      __meta: {
        name: "patient_group",
        schema: "public",
      },
      fields: {
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    patient_identification: {
      __meta: {
        name: "patient_identification",
        schema: "public",
      },
      fields: {
        key: { name: "key", type: { kind: "scalar", name: { name: "text" } } },
        value: {
          name: "value",
          type: { kind: "scalar", name: { name: "text" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    patient_info: {
      __meta: {
        name: "patient_info",
        schema: "public",
      },
      fields: {
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        nickname: {
          name: "nickname",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        birthdate: {
          name: "birthdate",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "date" } },
          },
        },
        birthplace: {
          name: "birthplace",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        admission_date: {
          name: "admission_date",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        depart_date: {
          name: "depart_date",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        decease_date: {
          name: "decease_date",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        doctor_name: {
          name: "doctor_name",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        doctor_phone: {
          name: "doctor_phone",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        general_remarks: {
          name: "general_remarks",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        medical_remarks: {
          name: "medical_remarks",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        blood_type: {
          name: "blood_type",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "t_blood_type" } },
          },
        },
        diet: {
          name: "diet",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        nat_number: {
          name: "nat_number",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        healthservice_number: {
          name: "healthservice_number",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        katz_score: {
          name: "katz_score",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        is_diabetic: {
          name: "is_diabetic",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "boolean" } },
          },
        },
        is_epileptic: {
          name: "is_epileptic",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "boolean" } },
          },
        },
        is_palliative: {
          name: "is_palliative",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "boolean" } },
          },
        },
        has_angor: {
          name: "has_angor",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "boolean" } },
          },
        },
        has_pacemaker: {
          name: "has_pacemaker",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "boolean" } },
          },
        },
        has_coagulationdisorder: {
          name: "has_coagulationdisorder",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "boolean" } },
          },
        },
        has_copd: {
          name: "has_copd",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "boolean" } },
          },
        },
        dementia_stage: {
          name: "dementia_stage",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "dementia_stage" } },
          },
        },
        food_allergies: {
          name: "food_allergies",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        medicine_allergies: {
          name: "medicine_allergies",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        other_allergies: {
          name: "other_allergies",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        dnr: {
          name: "dnr",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "boolean" } },
          },
        },
        dnrdescription: {
          name: "dnrdescription",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        constraints: {
          name: "constraints",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    patient_medical_information: {
      __meta: {
        name: "patient_medical_information",
        schema: "public",
      },
      fields: {
        diet: {
          name: "diet",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        general: {
          name: "general",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        general_practitioner_identifier: {
          name: "general_practitioner_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        blood_type_identifier: {
          name: "blood_type_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        dementia_identifier: {
          name: "dementia_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        blood_type: {
          name: "blood_type",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "t_blood_type" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    patient_session: {
      __meta: {
        name: "patient_session",
        schema: "public",
      },
      fields: {
        tasks_performed: {
          name: "tasks_performed",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        timestamp_enter: {
          name: "timestamp_enter",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        timestamp_leave: {
          name: "timestamp_leave",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        care_session_identifier: {
          name: "care_session_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    patient_social_information: {
      __meta: {
        name: "patient_social_information",
        schema: "public",
      },
      fields: {
        instagram_token: {
          name: "instagram_token",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        general: {
          name: "general",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    period: {
      __meta: {
        name: "period",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        start_time: {
          name: "start_time",
          type: { kind: "scalar", name: { name: "time without time zone" } },
        },
        end_time: {
          name: "end_time",
          type: { kind: "scalar", name: { name: "time without time zone" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    picture: {
      __meta: {
        name: "picture",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        data: {
          name: "data",
          type: { kind: "scalar", name: { name: "bytea" } },
        },
        mimetype: {
          name: "mimetype",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    planned_care_action: {
      __meta: {
        name: "planned_care_action",
        schema: "public",
      },
      fields: {
        utc_timestamp: {
          name: "utc_timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        care_action_identifier: {
          name: "care_action_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        remarks: {
          name: "remarks",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        authorization_type: {
          name: "authorization_type",
          type: { kind: "scalar", name: { name: "authorization_type" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    planned_measurement: {
      __meta: {
        name: "planned_measurement",
        schema: "public",
      },
      fields: {
        measurement_type: {
          name: "measurement_type",
          type: { kind: "scalar", name: { name: "measurement_type" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        utc_timestamp: {
          name: "utc_timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        remarks: {
          name: "remarks",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    planned_medication: {
      __meta: {
        name: "planned_medication",
        schema: "public",
      },
      fields: {
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        phase: {
          name: "phase",
          type: { kind: "scalar", name: { name: "medication_phase" } },
        },
        remarks: {
          name: "remarks",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        utc_timestamp: {
          name: "utc_timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    planned_medication_detail: {
      __meta: {
        name: "planned_medication_detail",
        schema: "public",
      },
      fields: {
        planned_medication_identifier: {
          name: "planned_medication_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        medication_type_identifier: {
          name: "medication_type_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        dosage: {
          name: "dosage",
          type: { kind: "scalar", name: { name: "real" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    possible_service_function: {
      __meta: {
        name: "possible_service_function",
        schema: "public",
      },
      fields: {
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    possible_work_order: {
      __meta: {
        name: "possible_work_order",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        possible_work_order_top_identifier: {
          name: "possible_work_order_top_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    possible_work_order_top: {
      __meta: {
        name: "possible_work_order_top",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    predefined_broadcast_call: {
      __meta: {
        name: "predefined_broadcast_call",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        sound: {
          name: "sound",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    process: {
      __meta: {
        name: "process",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        site_identifier: {
          name: "site_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        mis_connection_identifier: {
          name: "mis_connection_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    process_boot_cycle: {
      __meta: {
        name: "process_boot_cycle",
        schema: "public",
      },
      fields: {
        version: {
          name: "version",
          type: { kind: "scalar", name: { name: "text" } },
        },
        build: {
          name: "build",
          type: { kind: "scalar", name: { name: "text" } },
        },
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        process_identifier: {
          name: "process_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    radio: {
      __meta: {
        name: "radio",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        avatar: {
          name: "avatar",
          type: { kind: "scalar", name: { name: "text" } },
        },
        stream: {
          name: "stream",
          type: { kind: "scalar", name: { name: "text" } },
        },
        priority: {
          name: "priority",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    remote_alarm: {
      __meta: {
        name: "remote_alarm",
        schema: "public",
      },
      fields: {
        created: {
          name: "created",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        trusted_device_identifier: {
          name: "trusted_device_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        sui_status_identifier: {
          name: "sui_status_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    rf_module: {
      __meta: {
        name: "rf_module",
        schema: "public",
      },
      fields: {
        serial: {
          name: "serial",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        brand_identifier: {
          name: "brand_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        type_identifier: {
          name: "type_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        location_identifier: {
          name: "location_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        activity_timestamp: {
          name: "activity_timestamp",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        activity_data: {
          name: "activity_data",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        battery_low: {
          name: "battery_low",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "boolean" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    role: {
      __meta: {
        name: "role",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    room: {
      __meta: {
        name: "room",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        location_identifier: {
          name: "location_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    section: {
      __meta: {
        name: "section",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    service_function: {
      __meta: {
        name: "service_function",
        schema: "public",
      },
      fields: {
        timestamp_enter: {
          name: "timestamp_enter",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        timestamp_leave: {
          name: "timestamp_leave",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        possible_service_function_identifier: {
          name: "possible_service_function_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    setting: {
      __meta: {
        name: "setting",
        schema: "public",
      },
      fields: {
        key: { name: "key", type: { kind: "scalar", name: { name: "text" } } },
        value: {
          name: "value",
          type: { kind: "scalar", name: { name: "text" } },
        },
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "text" } },
        },
        site_identifier: {
          name: "site_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        process_identifier: {
          name: "process_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    shortcut: {
      __meta: {
        name: "shortcut",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        icon: {
          name: "icon",
          type: { kind: "scalar", name: { name: "text" } },
        },
        url: { name: "url", type: { kind: "scalar", name: { name: "text" } } },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "shortcut_type" } },
        },
        position: {
          name: "position",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        picture_identifier: {
          name: "picture_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        patient_can_view: {
          name: "patient_can_view",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    shortcut_role: {
      __meta: {
        name: "shortcut_role",
        schema: "public",
      },
      fields: {
        shortcut_identifier: {
          name: "shortcut_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        role_identifier: {
          name: "role_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    site: {
      __meta: {
        name: "site",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    spectralink_account: {
      __meta: {
        name: "spectralink_account",
        schema: "public",
      },
      fields: {
        number: {
          name: "number",
          type: { kind: "scalar", name: { name: "text" } },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    spectralink_group: {
      __meta: {
        name: "spectralink_group",
        schema: "public",
      },
      fields: {
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        cas_mode: {
          name: "cas_mode",
          type: { kind: "scalar", name: { name: "cas_mode" } },
        },
        cas_version: {
          name: "cas_version",
          type: { kind: "scalar", name: { name: "bigint" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    spectralink_message: {
      __meta: {
        name: "spectralink_message",
        schema: "public",
      },
      fields: {
        external_identifier: {
          name: "external_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        key: { name: "key", type: { kind: "scalar", name: { name: "text" } } },
        action: {
          name: "action",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        parameters: {
          name: "parameters",
          type: { kind: "scalar", name: { name: "jsonb" } },
        },
        scheduled_at: {
          name: "scheduled_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        sent_at: {
          name: "sent_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        deleted_at: {
          name: "deleted_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        expired_at: {
          name: "expired_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        account_identifier: {
          name: "account_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        created_at: {
          name: "created_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    spectralink_message_queue: {
      __meta: {
        name: "spectralink_message_queue",
        schema: "public",
      },
      fields: {
        guid: {
          name: "guid",
          type: { kind: "scalar", name: { name: "text" } },
        },
        engine_event_identifier: {
          name: "engine_event_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        message: {
          name: "message",
          type: { kind: "scalar", name: { name: "text" } },
        },
        action: {
          name: "action",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        response: {
          name: "response",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        color: {
          name: "color",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        alerttone: {
          name: "alerttone",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        alertvolume: {
          name: "alertvolume",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        alerttimeout: {
          name: "alerttimeout",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        callback: {
          name: "callback",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        account_identifier: {
          name: "account_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        created_at: {
          name: "created_at",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        sent_at: {
          name: "sent_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        delivered_at: {
          name: "delivered_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        man_ack_at: {
          name: "man_ack_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        deleted: {
          name: "deleted",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        deletion_sent_at: {
          name: "deletion_sent_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        deletion_confirmed_at: {
          name: "deletion_confirmed_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    spectralink_message_reference: {
      __meta: {
        name: "spectralink_message_reference",
        schema: "public",
      },
      fields: {
        key: { name: "key", type: { kind: "scalar", name: { name: "text" } } },
        engine_call_action_message_identifier: {
          name: "engine_call_action_message_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        context_location_identifier: {
          name: "context_location_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        tag: {
          name: "tag",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    state_cause: {
      __meta: {
        name: "state_cause",
        schema: "public",
      },
      fields: {
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        id_lsb: {
          name: "id_lsb",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        id_msb: {
          name: "id_msb",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "text" } },
        },
        device_identifier: {
          name: "device_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        state_cause_template_identifier: {
          name: "state_cause_template_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    state_cause_template: {
      __meta: {
        name: "state_cause_template",
        schema: "public",
      },
      fields: {
        priority: {
          name: "priority",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    state_machine_change_action_config: {
      __meta: {
        name: "state_machine_change_action_config",
        schema: "public",
      },
      fields: {
        state_machine: {
          name: "state_machine",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        state_machine_state: {
          name: "state_machine_state",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        action_config_identifier: {
          name: "action_config_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    state_machine_state: {
      __meta: {
        name: "state_machine_state",
        schema: "public",
      },
      fields: {
        state_machine: {
          name: "state_machine",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        state: {
          name: "state",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        device_identifier: {
          name: "device_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    status_app: {
      __meta: {
        name: "status_app",
        schema: "public",
      },
      fields: {
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    status_dect: {
      __meta: {
        name: "status_dect",
        schema: "public",
      },
      fields: {
        beep: {
          name: "beep",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        priority: {
          name: "priority",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    string: {
      __meta: {
        name: "string",
        schema: "public",
      },
      fields: {
        value: {
          name: "value",
          type: { kind: "scalar", name: { name: "text" } },
        },
        bluetooth_device_identifier: {
          name: "bluetooth_device_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    sui_patient_info: {
      __meta: {
        name: "sui_patient_info",
        schema: "public",
      },
      fields: {
        password: {
          name: "password",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        info_url: {
          name: "info_url",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        instagram_api_token: {
          name: "instagram_api_token",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        show_instagram_on_screensaver: {
          name: "show_instagram_on_screensaver",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    sui_status: {
      __meta: {
        name: "sui_status",
        schema: "public",
      },
      fields: {
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        linked_with_location: {
          name: "linked_with_location",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        read_only: {
          name: "read_only",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        home: {
          name: "home",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        last_active: {
          name: "last_active",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        image_identifier: {
          name: "image_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    sui_status_trigger: {
      __meta: {
        name: "sui_status_trigger",
        schema: "public",
      },
      fields: {
        created: {
          name: "created",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        active: {
          name: "active",
          type: { kind: "scalar", name: { name: "boolean" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        on_connected_identifier: {
          name: "on_connected_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        on_disconnected_identifier: {
          name: "on_disconnected_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        wifi_network_identifier: {
          name: "wifi_network_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        bluetooth_device_identifier: {
          name: "bluetooth_device_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    supplement: {
      __meta: {
        name: "supplement",
        schema: "public",
      },
      fields: {
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        description: {
          name: "description",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    supplement_registration: {
      __meta: {
        name: "supplement_registration",
        schema: "public",
      },
      fields: {
        count: {
          name: "count",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        comment: {
          name: "comment",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        supplement_identifier: {
          name: "supplement_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    task_type: {
      __meta: {
        name: "task_type",
        schema: "public",
      },
      fields: {
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    translation: {
      __meta: {
        name: "translation",
        schema: "public",
      },
      fields: {
        translation_key: {
          name: "translation_key",
          type: { kind: "scalar", name: { name: "text" } },
        },
        en: {
          name: "en",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        nl: {
          name: "nl",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        fr: {
          name: "fr",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        ru: {
          name: "ru",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        de: {
          name: "de",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    trusted_device: {
      __meta: {
        name: "trusted_device",
        schema: "public",
      },
      fields: {
        code: {
          name: "code",
          type: { kind: "scalar", name: { name: "text" } },
        },
        name: {
          name: "name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        platform: {
          name: "platform",
          type: { kind: "scalar", name: { name: "text" } },
        },
        software_version: {
          name: "software_version",
          type: { kind: "scalar", name: { name: "text" } },
        },
        created: {
          name: "created",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        last_used: {
          name: "last_used",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    ui_access: {
      __meta: {
        name: "ui_access",
        schema: "public",
      },
      fields: {
        platform: {
          name: "platform",
          type: { kind: "scalar", name: { name: "text" } },
        },
        view: {
          name: "view",
          type: { kind: "scalar", name: { name: "text" } },
        },
        priority: {
          name: "priority",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    version_history: {
      __meta: {
        name: "version_history",
        schema: "public",
      },
      fields: {
        installed_version: {
          name: "installed_version",
          type: { kind: "scalar", name: { name: "text" } },
        },
        installed_on: {
          name: "installed_on",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp without time zone" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    webrtc_account: {
      __meta: {
        name: "webrtc_account",
        schema: "public",
      },
      fields: {
        type: {
          name: "type",
          type: { kind: "scalar", name: { name: "text" } },
        },
        display_name: {
          name: "display_name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        number: {
          name: "number",
          type: { kind: "scalar", name: { name: "text" } },
        },
        domain: {
          name: "domain",
          type: { kind: "scalar", name: { name: "text" } },
        },
        ws_servers: {
          name: "ws_servers",
          type: { kind: "scalar", name: { name: "text" } },
        },
        authorization_user: {
          name: "authorization_user",
          type: { kind: "scalar", name: { name: "text" } },
        },
        password: {
          name: "password",
          type: { kind: "scalar", name: { name: "text" } },
        },
        location_identifier: {
          name: "location_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        camera_identifier: {
          name: "camera_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        device_identifier: {
          name: "device_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    wifi_network: {
      __meta: {
        name: "wifi_network",
        schema: "public",
      },
      fields: {
        ssid: {
          name: "ssid",
          type: { kind: "scalar", name: { name: "text" } },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    work_order: {
      __meta: {
        name: "work_order",
        schema: "public",
      },
      fields: {
        status: {
          name: "status",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        comment: {
          name: "comment",
          type: { kind: "scalar", name: { name: "text" } },
        },
        timestamp: {
          name: "timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        timestamp_solved: {
          name: "timestamp_solved",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        possible_work_order_identifier: {
          name: "possible_work_order_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        patient_identifier: {
          name: "patient_identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
        employee_identifier: {
          name: "employee_identifier",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "integer" } },
          },
        },
        mailed_at: {
          name: "mailed_at",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
    yunction_log: {
      __meta: {
        name: "yunction_log",
        schema: "public",
      },
      fields: {
        utc_timestamp: {
          name: "utc_timestamp",
          type: { kind: "scalar", name: { name: "timestamp with time zone" } },
        },
        application_name: {
          name: "application_name",
          type: { kind: "scalar", name: { name: "text" } },
        },
        remarks: {
          name: "remarks",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        details: {
          name: "details",
          type: {
            kind: "nullable",
            typevar: { kind: "scalar", name: { name: "text" } },
          },
        },
        sent_home_on: {
          name: "sent_home_on",
          type: {
            kind: "nullable",
            typevar: {
              kind: "scalar",
              name: { name: "timestamp with time zone" },
            },
          },
        },
        identifier: {
          name: "identifier",
          type: { kind: "scalar", name: { name: "integer" } },
        },
      },
    },
  },
} as const);

export type MyDb = {
  access_control_access_door_group: access_control_access_door_groupTable;
  access_door_access_control: access_door_access_controlTable;
  access_door_access_group: access_door_access_groupTable;
  access_door_door_procedure: access_door_door_procedureTable;
  access_door_group_access_group: access_door_group_access_groupTable;
  access_group_badge: access_group_badgeTable;
  application_svp_crews: application_svp_crewsTable;
  application_svp_status: application_svp_statusTable;
  broadcast_call_broadcast_call_group: broadcast_call_broadcast_call_groupTable;
  broadcast_call_group_device: broadcast_call_group_deviceTable;
  cas_audit_log: cas_audit_logTable;
  cas_notification: cas_notificationTable;
  cas_report: cas_reportTable;
  cas_session: cas_sessionTable;
  crew_location: crew_locationTable;
  dect_group_dect_account: dect_group_dect_accountTable;
  dect_group_location: dect_group_locationTable;
  diary_read: diary_readTable;
  employee_authorization: employee_authorizationTable;
  engine_call_action_message_destination_employee_role: engine_call_action_message_destination_employee_roleTable;
  flyway_schema_history: flyway_schema_historyTable;
  location_gateway_device_gateway: location_gateway_device_gatewayTable;
  location_patient: location_patientTable;
  management_account_management_site: management_account_management_siteTable;
  management_site_management_server: management_site_management_serverTable;
  message_images: message_imagesTable;
  message_read_employees: message_read_employeesTable;
  message_read_patients: message_read_patientsTable;
  message_to_patients: message_to_patientsTable;
  message_to_roles: message_to_rolesTable;
  patient_group_ui_access: patient_group_ui_accessTable;
  patient_lifeline_message_pending: patient_lifeline_message_pendingTable;
  patient_medical_information_allergies: patient_medical_information_allergiesTable;
  patient_patient_group: patient_patient_groupTable;
  possible_work_order_role: possible_work_order_roleTable;
  rf_module_brand: rf_module_brandTable;
  rf_module_type: rf_module_typeTable;
  role_status: role_statusTable;
  role_ui_access: role_ui_accessTable;
  roles_engine_call_action_message_destination_email: roles_engine_call_action_message_destination_emailTable;
  spectralink_group_location: spectralink_group_locationTable;
  spectralink_group_spectralink_account: spectralink_group_spectralink_accountTable;
  state_cause_template_device: state_cause_template_deviceTable;
  status: statusTable;
  task_types_roles: task_types_rolesTable;
  trusted_device_patient: trusted_device_patientTable;
  trusted_device_sui_status: trusted_device_sui_statusTable;
  access_door: access_doorTable;
  access_group: access_groupTable;
  action_config: action_configTable;
  action_config_dect_to_crews_of_location: action_config_dect_to_crews_of_locationTable;
  action_config_dect_to_crews_of_location_role: action_config_dect_to_crews_of_location_roleTable;
  action_config_dect_to_group: action_config_dect_to_groupTable;
  action_config_dect_to_group_dect_group: action_config_dect_to_group_dect_groupTable;
  action_config_spectralink_to_crews_of_location: action_config_spectralink_to_crews_of_locationTable;
  action_config_spectralink_to_crews_of_location_role: action_config_spectralink_to_crews_of_location_roleTable;
  action_config_spectralink_to_group: action_config_spectralink_to_groupTable;
  action_config_spectralink_to_group_spectralink_group: action_config_spectralink_to_group_spectralink_groupTable;
  activity: activityTable;
  address: addressTable;
  administration_contact: administration_contactTable;
  allergy: allergyTable;
  api_login: api_loginTable;
  api_token: api_tokenTable;
  app_message: app_messageTable;
  application_global: application_globalTable;
  application_svp: application_svpTable;
  appointment: appointmentTable;
  badge: badgeTable;
  blood_type: blood_typeTable;
  bluetooth_device: bluetooth_deviceTable;
  broadcast_call: broadcast_callTable;
  broadcast_call_group: broadcast_call_groupTable;
  call_reason: call_reasonTable;
  call_reason_category: call_reason_categoryTable;
  callback_queue: callback_queueTable;
  camera: cameraTable;
  care: careTable;
  care_action: care_actionTable;
  care_action_signature: care_action_signatureTable;
  care_session: care_sessionTable;
  com_port: com_portTable;
  contact: contactTable;
  contact_list: contact_listTable;
  crew: crewTable;
  day_night: day_nightTable;
  dect_account: dect_accountTable;
  dect_group: dect_groupTable;
  dect_message: dect_messageTable;
  dect_message_queue: dect_message_queueTable;
  default_text: default_textTable;
  dementia: dementiaTable;
  department: departmentTable;
  device: deviceTable;
  device_status: device_statusTable;
  diary: diaryTable;
  diary_patient: diary_patientTable;
  door_procedure: door_procedureTable;
  email: emailTable;
  employee: employeeTable;
  engine_action: engine_actionTable;
  engine_call: engine_callTable;
  engine_call_action: engine_call_actionTable;
  engine_call_action_message: engine_call_action_messageTable;
  engine_call_action_message_app: engine_call_action_message_appTable;
  engine_call_action_message_dect: engine_call_action_message_dectTable;
  engine_call_action_message_destination_dect: engine_call_action_message_destination_dectTable;
  engine_call_action_message_destination_email: engine_call_action_message_destination_emailTable;
  engine_call_action_message_destination_employee: engine_call_action_message_destination_employeeTable;
  engine_call_action_message_destination_spectralink: engine_call_action_message_destination_spectralinkTable;
  engine_call_action_message_email: engine_call_action_message_emailTable;
  engine_call_action_message_spectralink: engine_call_action_message_spectralinkTable;
  engine_call_action_viewpoint_notification: engine_call_action_viewpoint_notificationTable;
  engine_call_action_viewpoint_status: engine_call_action_viewpoint_statusTable;
  engine_device_configuration_profile: engine_device_configuration_profileTable;
  engine_event: engine_eventTable;
  engine_event_access_denied: engine_event_access_deniedTable;
  engine_event_access_entered: engine_event_access_enteredTable;
  engine_event_access_left: engine_event_access_leftTable;
  engine_event_badge_provided: engine_event_badge_providedTable;
  engine_event_badge_provisioned: engine_event_badge_provisionedTable;
  engine_event_rf_module_provided: engine_event_rf_module_providedTable;
  engine_event_viewpoint_state_changed: engine_event_viewpoint_state_changedTable;
  engine_server_configuration_profile: engine_server_configuration_profileTable;
  espa_in_message: espa_in_messageTable;
  fcm_account: fcm_accountTable;
  general_practitioner: general_practitionerTable;
  gps_signal: gps_signalTable;
  heartbeat: heartbeatTable;
  hulp_call: hulp_callTable;
  image: imageTable;
  lifeline_message: lifeline_messageTable;
  lifeline_message_answer: lifeline_message_answerTable;
  lifeline_message_button: lifeline_message_buttonTable;
  locality: localityTable;
  location: locationTable;
  location_call: location_callTable;
  location_call_callback: location_call_callbackTable;
  location_call_employee_presence: location_call_employee_presenceTable;
  location_call_patient_in_location: location_call_patient_in_locationTable;
  location_call_state_change: location_call_state_changeTable;
  log: logTable;
  log_care: log_careTable;
  log_door: log_doorTable;
  log_duty: log_dutyTable;
  log_employee_dect_account: log_employee_dect_accountTable;
  log_employee_spectralink_account: log_employee_spectralink_accountTable;
  log_engine_context_device: log_engine_context_deviceTable;
  log_engine_context_location: log_engine_context_locationTable;
  log_engine_context_patient: log_engine_context_patientTable;
  log_location_patient: log_location_patientTable;
  log_patient_cas_mode: log_patient_cas_modeTable;
  log_status: log_statusTable;
  management_account: management_accountTable;
  management_department: management_departmentTable;
  management_device: management_deviceTable;
  management_device_update: management_device_updateTable;
  management_room: management_roomTable;
  management_server: management_serverTable;
  management_site: management_siteTable;
  measurement_bloodpressure: measurement_bloodpressureTable;
  measurement_bloodsample: measurement_bloodsampleTable;
  measurement_glycemia: measurement_glycemiaTable;
  measurement_length: measurement_lengthTable;
  measurement_morsefallscale: measurement_morsefallscaleTable;
  measurement_oxygensaturation: measurement_oxygensaturationTable;
  measurement_pulse: measurement_pulseTable;
  measurement_signature: measurement_signatureTable;
  measurement_stoolrecord: measurement_stoolrecordTable;
  measurement_temperature: measurement_temperatureTable;
  measurement_urineoutput: measurement_urineoutputTable;
  measurement_visualpainscale: measurement_visualpainscaleTable;
  measurement_waterlowscale: measurement_waterlowscaleTable;
  measurement_weight: measurement_weightTable;
  medication: medicationTable;
  medication_form: medication_formTable;
  medication_signature: medication_signatureTable;
  medication_signature_detail: medication_signature_detailTable;
  medication_type: medication_typeTable;
  message: messageTable;
  mis_connection: mis_connectionTable;
  mis_connection_care_action: mis_connection_care_actionTable;
  mis_connection_care_action_signature: mis_connection_care_action_signatureTable;
  mis_connection_department: mis_connection_departmentTable;
  mis_connection_diary: mis_connection_diaryTable;
  mis_connection_employee: mis_connection_employeeTable;
  mis_connection_location: mis_connection_locationTable;
  mis_connection_measurement_signature: mis_connection_measurement_signatureTable;
  mis_connection_medication_signature: mis_connection_medication_signatureTable;
  mis_connection_medication_type: mis_connection_medication_typeTable;
  mis_connection_patient: mis_connection_patientTable;
  mis_connection_planned_care_action: mis_connection_planned_care_actionTable;
  mis_connection_planned_measurement: mis_connection_planned_measurementTable;
  mis_connection_planned_medication: mis_connection_planned_medicationTable;
  mis_connection_section: mis_connection_sectionTable;
  mis_connection_site: mis_connection_siteTable;
  monitor_status_device: monitor_status_deviceTable;
  monitor_status_server: monitor_status_serverTable;
  notification: notificationTable;
  organization: organizationTable;
  patient: patientTable;
  patient_administration_information: patient_administration_informationTable;
  patient_contact: patient_contactTable;
  patient_group: patient_groupTable;
  patient_identification: patient_identificationTable;
  patient_info: patient_infoTable;
  patient_medical_information: patient_medical_informationTable;
  patient_session: patient_sessionTable;
  patient_social_information: patient_social_informationTable;
  period: periodTable;
  picture: pictureTable;
  planned_care_action: planned_care_actionTable;
  planned_measurement: planned_measurementTable;
  planned_medication: planned_medicationTable;
  planned_medication_detail: planned_medication_detailTable;
  possible_service_function: possible_service_functionTable;
  possible_work_order: possible_work_orderTable;
  possible_work_order_top: possible_work_order_topTable;
  predefined_broadcast_call: predefined_broadcast_callTable;
  process: processTable;
  process_boot_cycle: process_boot_cycleTable;
  radio: radioTable;
  remote_alarm: remote_alarmTable;
  rf_module: rf_moduleTable;
  role: roleTable;
  room: roomTable;
  section: sectionTable;
  service_function: service_functionTable;
  setting: settingTable;
  shortcut: shortcutTable;
  shortcut_role: shortcut_roleTable;
  site: siteTable;
  spectralink_account: spectralink_accountTable;
  spectralink_group: spectralink_groupTable;
  spectralink_message: spectralink_messageTable;
  spectralink_message_queue: spectralink_message_queueTable;
  spectralink_message_reference: spectralink_message_referenceTable;
  state_cause: state_causeTable;
  state_cause_template: state_cause_templateTable;
  state_machine_change_action_config: state_machine_change_action_configTable;
  state_machine_state: state_machine_stateTable;
  status_app: status_appTable;
  status_dect: status_dectTable;
  string: stringTable;
  sui_patient_info: sui_patient_infoTable;
  sui_status: sui_statusTable;
  sui_status_trigger: sui_status_triggerTable;
  supplement: supplementTable;
  supplement_registration: supplement_registrationTable;
  task_type: task_typeTable;
  translation: translationTable;
  trusted_device: trusted_deviceTable;
  ui_access: ui_accessTable;
  version_history: version_historyTable;
  webrtc_account: webrtc_accountTable;
  wifi_network: wifi_networkTable;
  work_order: work_orderTable;
  yunction_log: yunction_logTable;
};

type access_control_access_door_groupTable = {
  access_control_identifier: number;
  access_door_group_identifier: number;
};

type access_door_access_controlTable = {
  access_door_identifier: number;
  access_control_identifier: number;
};

type access_door_access_groupTable = {
  access_door_identifier: number;
  access_group_identifier: number;
};

type access_door_door_procedureTable = {
  access_door_identifier: number;
  door_procedure_identifier: number;
};

type access_door_group_access_groupTable = {
  access_door_group_identifier: number;
  access_group_identifier: number;
};

type access_group_badgeTable = {
  access_group_identifier: number;
  badge_identifier: number;
};

type application_svp_crewsTable = {
  application_svp_identifier: number;
  crew_identifier: number;
};

type application_svp_statusTable = {
  application_svp_identifier: number;
  status_identifier: number;
};

type broadcast_call_broadcast_call_groupTable = {
  broadcast_call_identifier: number;
  broadcast_call_group_identifier: number;
};

type broadcast_call_group_deviceTable = {
  broadcast_call_group_identifier: number;
  device_identifier: number;
};

type cas_audit_logTable = {
  transaction: number;
  relation: string;
  operation: string;
  old: any | null;
  new: any | null;
  source: string | null;
  executed_at: joda.Instant;
};

type cas_notificationTable = {
  category: string;
  payload: any;
};

type cas_reportTable = {
  key: string;
  meta: any;
  visible: boolean;
};

type cas_sessionTable = {
  identifier: string;
  employee_identifier: number;
  created_at: joda.Instant;
  refreshed_at: joda.Instant;
};

type crew_locationTable = {
  crew_identifier: number;
  location_identifier: number;
};

type dect_group_dect_accountTable = {
  dect_group_identifier: number;
  dect_account_identifier: number;
};

type dect_group_locationTable = {
  dect_group_identifier: number;
  location_identifier: number;
};

type diary_readTable = {
  employee_identifier: number;
  patient_identifier: number;
  read_at: joda.Instant;
};

type employee_authorizationTable = {
  employee_identifier: number;
  authorization_type: authorization_type;
};

type engine_call_action_message_destination_employee_roleTable = {
  engine_call_action_message_destination_employee_identifier: number;
  role_identifier: number;
};

type flyway_schema_historyTable = {
  installed_rank: number;
  version: string | null;
  description: string;
  type: string;
  script: string;
  checksum: number | null;
  installed_by: string;
  installed_on: joda.LocalDateTime;
  execution_time: number;
  success: boolean;
};

type location_gateway_device_gatewayTable = {
  location_identifier: number;
  device_identifier: number;
};

type location_patientTable = {
  location_identifier: number;
  patient_identifier: number;
};

type management_account_management_siteTable = {
  management_account_identifier: number;
  management_site_identifier: number;
};

type management_site_management_serverTable = {
  management_site_identifier: number;
  management_server_identifier: number;
};

type message_imagesTable = {
  message_identifier: number;
  image_identifier: number;
};

type message_read_employeesTable = {
  message_identifier: number;
  employee_identifier: number;
};

type message_read_patientsTable = {
  message_identifier: number;
  patient_identifier: number;
};

type message_to_patientsTable = {
  message_identifier: number;
  patient_identifier: number;
};

type message_to_rolesTable = {
  message_identifier: number;
  role_identifier: number;
};

type patient_group_ui_accessTable = {
  patient_group_identifier: number;
  ui_access_identifier: number;
};

type patient_lifeline_message_pendingTable = {
  patient_identifier: number;
  lifeline_message_identifier: number;
};

type patient_medical_information_allergiesTable = {
  patient_medical_information_identifier: number;
  allergy_identifier: number;
};

type patient_patient_groupTable = {
  patient_identifier: number;
  patient_group_identifier: number;
};

type possible_work_order_roleTable = {
  possible_work_order_identifier: number;
  role_identifier: number;
};

type rf_module_brandTable = {
  identifier: number;
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
};

type rf_module_typeTable = {
  identifier: number;
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
};

type role_statusTable = {
  role_identifier: number;
  status_identifier: number;
};

type role_ui_accessTable = {
  role_identifier: number;
  ui_access_identifier: number;
};

type roles_engine_call_action_message_destination_emailTable = {
  role_identifier: number;
  engine_call_action_message_destination_email_identifier: number;
};

type spectralink_group_locationTable = {
  spectralink_group_identifier: number;
  location_identifier: number;
};

type spectralink_group_spectralink_accountTable = {
  spectralink_group_identifier: number;
  spectralink_account_identifier: number;
};

type state_cause_template_deviceTable = {
  state_cause_template_identifier: number;
  device_identifier: number;
};

type statusTable = {
  identifier: number;
  name: string;
  type: string;
  icon: string;
  color: string;
  text_color: string;
  background_color: string;
  pursuit_sound_repeat: string | null;
  pursuit_sound_night_repeat: string | null;
  pursuit_sound: string | null;
  pursuit_sound_night: string | null;
  priority: number;
  dect_identifier: number;
  app_identifier: number;
  cas_mode: cas_mode;
  cas_version: number;
};

type task_types_rolesTable = {
  task_type_identifier: number;
  role_identifier: number;
};

type trusted_device_patientTable = {
  trusted_device_identifier: number;
  patient_identifier: number;
};

type trusted_device_sui_statusTable = {
  trusted_device_identifier: number;
  sui_status_identifier: number;
};

type access_doorTable = {
  name: string;
  device_identifier: number;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type access_groupTable = {
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type action_configTable = {
  identifier: number;
};

type action_config_dect_to_crews_of_locationTable = {
  dect_type: number;
  dect_beep: number;
  dect_priority: number;
  message: string;
  action_config_identifier: number;
  only_to_employees_on_duty: boolean;
  identifier: number;
};

type action_config_dect_to_crews_of_location_roleTable = {
  action_config_dect_to_crews_of_location_identifier: number;
  role_identifier: number;
  identifier: number;
};

type action_config_dect_to_groupTable = {
  dect_type: number;
  dect_beep: number;
  dect_priority: number;
  message: string;
  action_config_identifier: number;
  identifier: number;
};

type action_config_dect_to_group_dect_groupTable = {
  action_config_dect_to_group_identifier: number;
  dect_group_identifier: number;
  identifier: number;
};

type action_config_spectralink_to_crews_of_locationTable = {
  message: string;
  spectralink_action: number;
  spectralink_response: number;
  spectralink_color: number;
  spectralink_alerttone: number;
  spectralink_alertvolume: number;
  spectralink_alerttimeout: number;
  spectralink_callback: number;
  action_config_identifier: number;
  only_to_employees_on_duty: boolean;
  identifier: number;
};

type action_config_spectralink_to_crews_of_location_roleTable = {
  action_config_spectralink_to_crews_of_location_identifier: number;
  role_identifier: number;
  identifier: number;
};

type action_config_spectralink_to_groupTable = {
  message: string;
  spectralink_action: number;
  spectralink_response: number;
  spectralink_color: number;
  spectralink_alerttone: number;
  spectralink_alertvolume: number;
  spectralink_alerttimeout: number;
  spectralink_callback: number;
  action_config_identifier: number;
  identifier: number;
};

type action_config_spectralink_to_group_spectralink_groupTable = {
  action_config_spectralink_to_group_identifier: number;
  spectralink_group_identifier: number;
  identifier: number;
};

type activityTable = {
  active: boolean;
  crew_identifier: number;
  employee_identifier: number;
  role_identifier: number;
  position: number;
  cas_version: number;
  identifier: number;
};

type addressTable = {
  address: string;
  street_number: string;
  city: string;
  zip_code: string;
  country: string | null;
  contact_identifier: number | null;
  identifier: number;
};

type administration_contactTable = {
  name: string | null;
  first_name: string | null;
  telephone: string | null;
  telephone2: string | null;
  gsm: string | null;
  fax: string | null;
  email: string | null;
  website: string | null;
  identifier: number;
};

type allergyTable = {
  name: string;
  identifier: number;
};

type api_loginTable = {
  login_identifier: string;
  password: string;
  employee_identifier: number | null;
  process_identifier: number | null;
  management_account_identifier: number | null;
  patient_identifier: number | null;
  device_identifier: number | null;
  identifier: number;
};

type api_tokenTable = {
  token: string;
  profile: string;
  start_time: joda.Instant;
  end_time: joda.Instant;
  api_login_identifier: number;
  identifier: number;
};

type app_messageTable = {
  message: string;
  status: number;
  type: number;
  delete_status: number;
  timestamp_sent: joda.Instant | null;
  timestamp_delivered: joda.Instant | null;
  timestamp_man_ack: joda.Instant | null;
  engine_call_action_message_identifier: number | null;
  employee_identifier: number;
  context_location_identifier: number | null;
  tag: string | null;
  identifier: number;
};

type application_globalTable = {
  comfort_during_night: boolean;
  embezzlement_time: number;
  device_identifier: number;
  identifier: number;
};

type application_svpTable = {
  view_in_screensaver: boolean;
  pursuit_enabled: boolean;
  device_identifier: number;
  esvp_device_identifier: number;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type appointmentTable = {
  start_date: joda.Instant;
  end_date: joda.Instant;
  description: string;
  location: string;
  patient_identifier: number;
  employee_identifier: number | null;
  identifier: number;
};

type badgeTable = {
  serial: string;
  timestamp: joda.Instant;
  updated: joda.Instant;
  employee_identifier: number | null;
  patient_identifier: number | null;
  cas_mode: cas_mode;
  cas_version: number;
  priority: boolean;
  identifier: number;
};

type blood_typeTable = {
  name: string;
  rhesus: string;
  identifier: number;
};

type bluetooth_deviceTable = {
  code: string;
  name: string;
  type: number;
  identifier: number;
};

type broadcast_callTable = {
  timestamp: joda.Instant;
  sound: string;
  employee_identifier: number | null;
  identifier: number;
};

type broadcast_call_groupTable = {
  name: string;
  identifier: number;
};

type call_reasonTable = {
  tag: string;
  created_at: joda.Instant;
  source: string;
  comment: string | null;
  call_reason_category_identifier: number;
  employee_identifier: number;
  patient_identifier: number | null;
  location_identifier: number | null;
  identifier: number;
};

type call_reason_categoryTable = {
  prefix: string | null;
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  type: call_reason_category_type;
  identifier: number;
};

type callback_queueTable = {
  callback_category: callback_category | null;
  location_call_callback_identifier: number;
  url: string;
  headers: any | null;
  body: any | null;
  last_send: joda.Instant | null;
  tries: number;
  status: callback_status;
  identifier: number;
};

type cameraTable = {
  location: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type careTable = {
  timestamp: joda.Instant;
  state: number;
  state_cause_identifier: number | null;
  status_identifier: number;
  identifier: number;
};

type care_actionTable = {
  groupname: string | null;
  name: string;
  plannedonly: boolean;
  authorization_type: authorization_type;
  identifier: number;
};

type care_action_signatureTable = {
  utc_timestamp: joda.Instant;
  care_action_identifier: number;
  patient_identifier: number;
  employee_identifier: number;
  done: boolean;
  reason_notdone: string | null;
  planned_care_action_identifier: number | null;
  remarks: string | null;
  synced_on: joda.Instant | null;
  identifier: number;
};

type care_sessionTable = {
  endpoint: number;
  timestamp_enter: joda.Instant;
  timestamp_leave: joda.Instant | null;
  locked: boolean;
  care_identifier: number;
  employee_identifier: number;
  identifier: number;
};

type com_portTable = {
  port: string;
  baudrate: number;
  parity: number;
  databits: number;
  stopbits: number;
  active: boolean;
  control_station: boolean;
  local_address: number;
  remote_address: number;
  support_sync_for_poll: boolean;
  support_remote_management: boolean;
  support_message_identifier: boolean;
  support_running_number: boolean;
  distributed_messaging_delay: number;
  expire_message_after: number;
  identifier: number;
};

type contactTable = {
  timestamp: joda.Instant;
  webrtc_account_identifier: number;
  contact_list_identifier: number;
  identifier: number;
};

type contact_listTable = {
  type: number;
  employee_identifier: number | null;
  crew_identifier: number | null;
  identifier: number;
};

type crewTable = {
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type day_nightTable = {
  timestamp: joda.Instant;
  description: string;
  remarks: string;
  patient_identifier: number;
  employee_identifier: number;
  period_identifier: number | null;
  identifier: number;
};

type dect_accountTable = {
  name: string;
  number: number;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type dect_groupTable = {
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type dect_messageTable = {
  message: string;
  beep: number;
  type: number;
  priority: number;
  status: number;
  delete_status: number;
  timestamp_sent: joda.Instant | null;
  timestamp_delivered: joda.Instant | null;
  timestamp_man_ack: joda.Instant | null;
  engine_call_action_message_identifier: number | null;
  account_identifier: number;
  callback_account_identifier: number | null;
  created_at: joda.Instant;
  scheduled_at: joda.Instant;
  expired_at: joda.Instant | null;
  context_location_identifier: number | null;
  tag: string | null;
  identifier: number;
};

type dect_message_queueTable = {
  guid: string;
  engine_event_identifier: number;
  message: string;
  beep: number;
  type: number;
  priority: number;
  number: number;
  created_at: joda.Instant;
  sent_at: joda.Instant | null;
  delivered_at: joda.Instant | null;
  man_ack_at: joda.Instant | null;
  deleted: boolean;
  deletion_sent_at: joda.Instant | null;
  deletion_confirmed_at: joda.Instant | null;
  identifier: number;
};

type default_textTable = {
  description: string;
  identifier: number;
};

type dementiaTable = {
  name: string;
  identifier: number;
};

type departmentTable = {
  name: string;
  code: string;
  site_identifier: number;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type deviceTable = {
  serial: number;
  name: string;
  verklizan_location_identifier: number | null;
  badge_mode: number;
  application: number;
  engine_device_configuration_profile_identifier: number | null;
  location_identifier: number;
  cas_mode: cas_mode;
  cas_version: number;
  verklizan_identifier: string | null;
  application_parameters: any;
  viedome_identifier: string | null;
  use_newui: boolean | null;
  identifier: number;
};

type device_statusTable = {
  name: string;
  state_machine: number;
  state_identifier: number;
  device_only: boolean;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type diaryTable = {
  description: string | null;
  remarks: string;
  employee_identifier: number | null;
  username: string;
  created: joda.Instant;
  synced_on: joda.Instant | null;
  identifier: number;
};

type diary_patientTable = {
  diary_identifier: number;
  patient_identifier: number;
  identifier: number;
};

type door_procedureTable = {
  name: string;
  functionality: number;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type emailTable = {
  address: string;
  patient_identifier: number | null;
  employee_identifier: number | null;
  role_identifier: number | null;
  crew_identifier: number | null;
  cas_version: number;
  possible_work_order_top_identifier: number | null;
  identifier: number;
};

type employeeTable = {
  name: string;
  avatar: string | null;
  dect_account_identifier: number | null;
  fcm_account_identifier: number | null;
  cms_code_one: string | null;
  cms_code_two: string | null;
  cms: string;
  spectralink_account_identifier: number | null;
  cas_language: string | null;
  cas_user: string | null;
  cas_password: string | null;
  cas_permissions: any | null;
  code: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type engine_actionTable = {
  action: string;
  engine_call_termination_identifier: number | null;
  engine_call_action_viewpoint_notification_acknowledgment_identi:
    | number
    | null;
  engine_call_action_viewpoint_notification_termination_identifie:
    | number
    | null;
  engine_call_action_viewpoint_status_acknowledgment_identifier: number | null;
  engine_call_action_viewpoint_status_termination_identifier: number | null;
  engine_call_action_message_acknowledgment_identifier: number | null;
  engine_call_action_message_rejection_identifier: number | null;
  engine_call_action_message_termination_identifier: number | null;
  engine_call_action_message_destination_employee_identifier: number | null;
  engine_call_action_message_destination_dect_identifier: number | null;
  engine_call_action_message_destination_email_identifier: number | null;
  engine_call_action_message_destination_spectralink_identifier: number | null;
  identifier: number;
};

type engine_callTable = {
  xtag: string;
  timestamp_requested: joda.Instant;
  timestamp_expired: joda.Instant;
  timestamp_executed: joda.Instant | null;
  identifier: number;
};

type engine_call_actionTable = {
  timestamp_requested: joda.Instant;
  timestamp_executed: joda.Instant | null;
  timestamp_processed: joda.Instant | null;
  engine_call_action_viewpoint_notification_identifier: number | null;
  engine_call_action_viewpoint_status_identifier: number | null;
  engine_call_action_message_identifier: number | null;
  engine_call_identifier: number;
  identifier: number;
};

type engine_call_action_messageTable = {
  text: string;
  identifier: number;
};

type engine_call_action_message_appTable = {
  type: number;
  identifier: number;
};

type engine_call_action_message_dectTable = {
  type: number;
  priority: number;
  beep: number;
  identifier: number;
};

type engine_call_action_message_destination_dectTable = {
  dect_group: string | null;
  engine_call_action_message_identifier: number;
  location_identifier: number | null;
  dect_account_identifier: number | null;
  settings_identifier: number | null;
  identifier: number;
};

type engine_call_action_message_destination_emailTable = {
  crew_identifier: number | null;
  employee_identifier: number | null;
  patient_identifier: number | null;
  location_identifier: number | null;
  engine_call_action_message_identifier: number;
  active: boolean;
  settings_identifier: number | null;
  identifier: number;
};

type engine_call_action_message_destination_employeeTable = {
  engine_call_action_message_identifier: number;
  employee_identifier: number | null;
  location_identifier: number | null;
  crew_identifier: number | null;
  active: boolean;
  settings_email_identifier: number | null;
  settings_app_identifier: number | null;
  settings_dect_identifier: number | null;
  settings_spectralink_identifier: number | null;
  identifier: number;
};

type engine_call_action_message_destination_spectralinkTable = {
  spectralink_group: string | null;
  engine_call_action_message_identifier: number;
  location_identifier: number | null;
  spectralink_account_identifier: number | null;
  settings_identifier: number | null;
  identifier: number;
};

type engine_call_action_message_emailTable = {
  title: string;
  identifier: number;
};

type engine_call_action_message_spectralinkTable = {
  action: string | null;
  response: string | null;
  repeat: string | null;
  led: string | null;
  icon: string | null;
  color: string | null;
  setup: string | null;
  alerttone: string | null;
  alertpattern: string | null;
  alertvolume: string | null;
  alerttimeout: string | null;
  displaytimeout: string | null;
  callback: string | null;
  identifier: number;
};

type engine_call_action_viewpoint_notificationTable = {
  text: string;
  location_identifier: number;
  status_identifier: number;
  notification_identifier: number | null;
  identifier: number;
};

type engine_call_action_viewpoint_statusTable = {
  cause_identifier: number | null;
  location_identifier: number;
  status_identifier: number;
  identifier: number;
};

type engine_device_configuration_profileTable = {
  name: string;
  crc: number;
  configuration: string;
  identifier: number;
};

type engine_eventTable = {
  timestamp: joda.Instant;
  badge_provided_identifier: number | null;
  badge_provisioned_identifier: number | null;
  rf_module_provided_identifier: number | null;
  access_entered_identifier: number | null;
  access_left_identifier: number | null;
  access_denied_identifier: number | null;
  viewpoint_state_changed_identifier: number | null;
  identifier: number;
};

type engine_event_access_deniedTable = {
  session_identifier: number | null;
  identifier: number;
};

type engine_event_access_enteredTable = {
  session_identifier: number;
  identifier: number;
};

type engine_event_access_leftTable = {
  session_identifier: number;
  identifier: number;
};

type engine_event_badge_providedTable = {
  device_identifier: number;
  badge_identifier: number;
  identifier: number;
};

type engine_event_badge_provisionedTable = {
  employee_identifier: number;
  patient_identifier: number;
  badge_identifier: number;
  identifier: number;
};

type engine_event_rf_module_providedTable = {
  device_identifier: number;
  rf_module_identifier: number;
  identifier: number;
};

type engine_event_viewpoint_state_changedTable = {
  location_identifier: number;
  identifier: number;
};

type engine_server_configuration_profileTable = {
  name: string;
  configuration: string;
  active: boolean;
  identifier: number;
};

type espa_in_messageTable = {
  timestamp_requested: joda.Instant;
  timestamp_executed: joda.Instant | null;
  message: string;
  beep: number;
  address: string;
  call_type: number;
  priority: number;
  com_port_identifier: number;
  identifier: number;
};

type fcm_accountTable = {
  code: string;
  timestamp_created: joda.Instant;
  timestamp_verified: joda.Instant;
  identifier: number;
};

type general_practitionerTable = {
  rziv: string;
  active: boolean;
  administration_contact_identifier: number;
  identifier: number;
};

type gps_signalTable = {
  longitude: number;
  latitude: number;
  description: string;
  created: joda.LocalDateTime;
  trusted_device_identifier: number | null;
  remote_alarm_identifier: number | null;
  address_identifier: number | null;
  identifier: number;
};

type heartbeatTable = {
  mac_address: string | null;
  last_ip_address: string | null;
  utc_timestamp_lastseen: joda.Instant;
  utc_timestamp_lastboot: joda.Instant | null;
  type: heartbeat_type;
  tag: string | null;
  identifier: number;
};

type hulp_callTable = {
  name: string;
  priority: number;
  patient_identifier: number;
  webrtc_account_identifier: number;
  identifier: number;
};

type imageTable = {
  code: string;
  url: string;
  type: string;
  timestamp: joda.Instant;
  identifier: number;
};

type lifeline_messageTable = {
  identifier: number;
};

type lifeline_message_answerTable = {
  timestamp: joda.Instant;
  lifeline_message_identifier: number;
  patient_identifier: number;
  lifeline_message_button_identifier: number | null;
  identifier: number;
};

type lifeline_message_buttonTable = {
  text: string;
  color: string;
  lifeline_message_identifier: number;
  identifier: number;
};

type localityTable = {
  rssi: number;
  timestamp: joda.Instant;
  rf_module_identifier: number;
  device_identifier: number;
  identifier: number;
};

type locationTable = {
  name: string;
  manual_ack_possible: boolean;
  timezone: string;
  department_identifier: number | null;
  care_identifier: number;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
  serial: number;
};

type location_callTable = {
  location_identifier: number;
  started: joda.Instant;
  ended: joda.Instant | null;
  current_status_identifier: number | null;
  call_reason_category_identifier: number | null;
  call_reason_comments: string | null;
  call_reason_employee_identifier: number | null;
  identifier: number;
};

type location_call_callbackTable = {
  location_call_identifier: number;
  url: string;
  headers: any | null;
  on_create: boolean;
  on_update: boolean;
  on_close: boolean;
  identifier: number;
};

type location_call_employee_presenceTable = {
  location_call_identifier: number;
  employee_identifier: number;
  timestamp_enter: joda.Instant;
  timestamp_leave: joda.Instant | null;
  identifier: number;
};

type location_call_patient_in_locationTable = {
  location_call_identifier: number;
  patient_identifier: number;
  identifier: number;
};

type location_call_state_changeTable = {
  location_call_identifier: number;
  status_identifier: number;
  timestamp: joda.Instant;
  source: call_source | null;
  identifier: number;
};

type logTable = {
  timestamp: joda.Instant;
  category: string;
  type: string;
  parameters: string;
  site_identifier: number | null;
  identifier: number;
};

type log_careTable = {
  location_identifier: number;
  employee_identifier: number;
  period: unknown;
  identifier: number;
};

type log_doorTable = {
  access_door_identifier: number;
  employee_identifier: number | null;
  patient_identifier: number | null;
  timestamp: joda.Instant;
  identifier: number;
};

type log_dutyTable = {
  crew_identifier: number;
  employee_identifier: number;
  role_identifier: number;
  period: unknown;
  identifier: number;
};

type log_employee_dect_accountTable = {
  employee_identifier: number;
  dect_account_identifier: number;
  period: unknown;
  identifier: number;
};

type log_employee_spectralink_accountTable = {
  employee_identifier: number;
  spectralink_account_identifier: number;
  period: unknown;
  identifier: number;
};

type log_engine_context_deviceTable = {
  tag: string;
  state: string;
  parameters: any;
  entered_at: joda.Instant;
  device_identifier: number;
  identifier: number;
};

type log_engine_context_locationTable = {
  tag: string;
  state: string;
  parameters: any;
  entered_at: joda.Instant;
  location_identifier: number;
  identifier: number;
};

type log_engine_context_patientTable = {
  tag: string;
  state: string;
  parameters: any;
  entered_at: joda.Instant;
  patient_identifier: number;
  identifier: number;
};

type log_location_patientTable = {
  location_identifier: number;
  patient_identifier: number;
  period: unknown;
  identifier: number;
};

type log_patient_cas_modeTable = {
  patient_identifier: number;
  period: unknown;
  identifier: number;
};

type log_statusTable = {
  location_identifier: number;
  status_identifier: number;
  timestamp: joda.Instant;
  identifier: number;
};

type management_accountTable = {
  email: string;
  flag: number;
  identifier: number;
};

type management_departmentTable = {
  name: string;
  description: string;
  site_identifier: number;
  identifier: number;
};

type management_deviceTable = {
  name: string;
  serial: number;
  end_of_line_a: boolean;
  end_of_line_b: boolean;
  description: string;
  type: string;
  server_identifier: number;
  room_identifier: number;
  identifier: number;
};

type management_device_updateTable = {
  timestamp: joda.Instant;
  end_of_line_a: boolean;
  end_of_line_b: boolean;
  serial: number;
  account_identifier: number;
  server_identifier: number;
  site_identifier: number;
  device_identifier: number;
  identifier: number;
};

type management_roomTable = {
  name: string;
  description: string;
  department_identifier: number;
  identifier: number;
};

type management_serverTable = {
  server_name: string;
  server_code: string;
  server_device_address: string;
  server_public_address: string;
  server_private_address: string;
  endpoint_websocket: string;
  endpoint_engine: string;
  endpoint_api: string;
  description: string;
  identifier: number;
};

type management_siteTable = {
  name: string;
  description: string;
  identifier: number;
};

type measurement_bloodpressureTable = {
  upper: number;
  lower: number;
  measurement_signature_identifier: number;
  context_value: bloodpressure_context_value | null;
  identifier: number;
};

type measurement_bloodsampleTable = {
  value: number;
  measurement_signature_identifier: number;
  kind: bloodsample_kind | null;
  identifier: number;
};

type measurement_glycemiaTable = {
  value: number;
  measurement_signature_identifier: number;
  context_value: glycemia_context_value | null;
  identifier: number;
};

type measurement_lengthTable = {
  value: number;
  measurement_signature_identifier: number;
  identifier: number;
};

type measurement_morsefallscaleTable = {
  measurement_signature_identifier: number;
  history_of_falling: boolean;
  secondary_diagnosis: boolean;
  ambulatory_aid: morsefallscale_ambulatoryaid_answer;
  iv_heparin_lock: boolean;
  gait: morsefallscale_gait_answer;
  mental_status: morsefallscale_mentalstatus_answer;
  identifier: number;
};

type measurement_oxygensaturationTable = {
  value: number;
  measurement_signature_identifier: number;
  identifier: number;
};

type measurement_pulseTable = {
  value: number;
  measurement_signature_identifier: number;
  context_value: pulse_context_value | null;
  identifier: number;
};

type measurement_signatureTable = {
  measurement_type: measurement_type;
  patient_identifier: number;
  employee_identifier: number;
  planned_measurement_identifier: number | null;
  utc_timestamp: joda.Instant;
  reason_notdone: string | null;
  done: boolean;
  synced_on: joda.Instant | null;
  identifier: number;
};

type measurement_stoolrecordTable = {
  value: number;
  measurement_signature_identifier: number;
  context_value: stoolrecord_context_value | null;
  identifier: number;
};

type measurement_temperatureTable = {
  value: number;
  measurement_signature_identifier: number;
  identifier: number;
};

type measurement_urineoutputTable = {
  value: number;
  measurement_signature_identifier: number;
  context_value: urineoutput_context_value | null;
  identifier: number;
};

type measurement_visualpainscaleTable = {
  value: number;
  measurement_signature_identifier: number;
  identifier: number;
};

type measurement_waterlowscaleTable = {
  measurement_signature_identifier: number;
  build_height: waterlowscale_build_height_answer;
  skintype: waterlowscale_skintype_answer[];
  gender: waterlowscale_gender_answer;
  agerange: waterlowscale_agerange_answer;
  specialrisks: waterlowscale_specialrisks_answer[];
  continence: waterlowscale_continence_answer[];
  mobility: waterlowscale_mobility_answer[];
  apetite: waterlowscale_apetite_answer;
  neurological_disorders: waterlowscale_neurological_disorders_answer[];
  extensive_surgery: waterlowscale_extensive_surgery_answer[];
  medications: waterlowscale_medications_answer[];
  identifier: number;
};

type measurement_weightTable = {
  value: number;
  measurement_signature_identifier: number;
  identifier: number;
};

type medicationTable = {
  code: string;
  name: string;
  description: string;
  medication_form_identifier: number;
  identifier: number;
};

type medication_formTable = {
  name: string;
  identifier: number;
};

type medication_signatureTable = {
  utc_timestamp: joda.Instant;
  employee_identifier: number;
  planned_medication_identifier: number;
  done: boolean;
  reason_notdone: string | null;
  phase: medication_phase;
  patient_identifier: number;
  synced_on: joda.Instant | null;
  identifier: number;
};

type medication_signature_detailTable = {
  medication_signature_identifier: number;
  medication_type_identifier: number;
  dosage: number;
  identifier: number;
};

type medication_typeTable = {
  grouping: string | null;
  name: string;
  unit: string;
  code: string | null;
  identifier: number;
};

type messageTable = {
  type: number;
  message: string;
  timestamp: joda.Instant;
  from_name: string | null;
  from_patient_identifier: number | null;
  from_employee_identifier: number | null;
  about_patient_identifier: number | null;
  lifeline_message_identifier: number | null;
  identifier: number;
};

type mis_connectionTable = {
  name: string;
  type: string;
  definition: any;
  populated_at: joda.Instant | null;
  identifier: number;
};

type mis_connection_care_actionTable = {
  mis_connection_identifier: number;
  care_action_identifier: number;
  external_identifier: string;
  identifier: number;
};

type mis_connection_care_action_signatureTable = {
  mis_connection_identifier: number;
  care_action_signature_identifier: number;
  external_identifier: string;
  identifier: number;
};

type mis_connection_departmentTable = {
  mis_connection_identifier: number;
  department_identifier: number;
  identification: any;
  data: any | null;
  mis_mode: mis_mode;
  cas_version: number;
  identifier: number;
};

type mis_connection_diaryTable = {
  mis_connection_identifier: number;
  diary_identifier: number;
  external_identifier: string;
  identifier: number;
};

type mis_connection_employeeTable = {
  mis_connection_identifier: number;
  employee_identifier: number;
  identification: any;
  data: any | null;
  mis_mode: mis_mode;
  cas_version: number;
  identifier: number;
};

type mis_connection_locationTable = {
  mis_connection_identifier: number;
  location_identifier: number;
  identification: any;
  data: any | null;
  mis_mode: mis_mode;
  cas_version: number;
  identifier: number;
};

type mis_connection_measurement_signatureTable = {
  mis_connection_identifier: number;
  measurement_signature_identifier: number;
  external_identifier: string;
  identifier: number;
};

type mis_connection_medication_signatureTable = {
  mis_connection_identifier: number;
  medication_signature_identifier: number;
  external_identifier: string;
  identifier: number;
};

type mis_connection_medication_typeTable = {
  mis_connection_identifier: number;
  medication_type_identifier: number;
  external_identifier: string;
  identifier: number;
};

type mis_connection_patientTable = {
  mis_connection_identifier: number;
  patient_identifier: number;
  identification: any;
  data: any | null;
  mis_mode: mis_mode;
  cas_version: number;
  identifier: number;
};

type mis_connection_planned_care_actionTable = {
  planned_care_action_identifier: number;
  external_identifier: string;
  mis_connection_identifier: number;
  identifier: number;
};

type mis_connection_planned_measurementTable = {
  mis_connection_identifier: number;
  planned_measurement_identifier: number;
  external_identifier: string;
  identifier: number;
};

type mis_connection_planned_medicationTable = {
  mis_connection_identifier: number;
  planned_medication_identifier: number;
  external_identifier: string;
  identifier: number;
};

type mis_connection_sectionTable = {
  mis_connection_identifier: number;
  section_identifier: number;
  identification: any;
  data: any | null;
  mis_mode: mis_mode;
  cas_version: number;
  identifier: number;
};

type mis_connection_siteTable = {
  mis_connection_identifier: number;
  site_identifier: number;
  identification: any;
  data: any | null;
  mis_mode: mis_mode;
  cas_version: number;
  identifier: number;
};

type monitor_status_deviceTable = {
  device_identifier: number;
  utc_timestamp_lastboot: joda.Instant | null;
  utc_timestamp_lastboot_ui: joda.Instant | null;
  utc_timestamp_lastcontact: joda.Instant | null;
  utc_timestamp_lastcontact_ui: joda.Instant | null;
  utc_timestamp_lastupdate: joda.Instant | null;
  processing_rmq_status: monitor_rmq_status | null;
  overheat_status: monitor_heat_status | null;
  voice_status: monitor_voice_status | null;
  last_known_ip: string | null;
  last_known_ui_ip: string | null;
  mac_address: string | null;
  identifier: number;
};

type monitor_status_serverTable = {
  host_name: string;
  last_known_ip: string | null;
  utc_timestamp_lastboot: joda.Instant | null;
  utc_timestamp_lastcontact: joda.Instant | null;
  utc_timestamp_lastupdate: joda.Instant | null;
  disk_space_gb_free: number | null;
  disk_space_percent_used: number | null;
  cpu_percent: number | null;
  mem_gb_free: number | null;
  mem_percent_used: number | null;
  identifier: number;
};

type notificationTable = {
  message: string;
  timestamp: joda.Instant;
  state: number;
  location_identifier: number;
  status_identifier: number;
  employee_identifier: number | null;
  tag: string | null;
  acknowledged_at: joda.Instant | null;
  deleted_at: joda.Instant | null;
  identifier: number;
};

type organizationTable = {
  type: number;
  name: string;
  administration_contact_identifier: number;
  identifier: number;
};

type patientTable = {
  name: string;
  first_name: string;
  last_name: string;
  sex: string;
  code: string;
  avatar: string | null;
  status: number;
  patient_administration_information_identifier: number | null;
  patient_social_information_identifier: number | null;
  patient_medical_information_identifier: number | null;
  section_identifier: number | null;
  room_identifier: number | null;
  cas_mode: cas_mode;
  cas_version: number;
  middle_name: string | null;
  identifier: number;
};

type patient_administration_informationTable = {
  nickname: string | null;
  birthdate: joda.LocalDate | null;
  birthplace: string | null;
  marital_status: string | null;
  nationality: string | null;
  national_insurance_number: string | null;
  identity_card_number: string | null;
  bank_account: string | null;
  membership_number: string | null;
  start_hospitalization: joda.LocalDate | null;
  end_hospitalization: joda.LocalDate | null;
  religion: string | null;
  remarks: string | null;
  health_insurance_identifier: number | null;
  preferably_hospital_identifier: number | null;
  domicile_identifier: number | null;
  doctor_name: string | null;
  doctor_phone: string | null;
  identifier: number;
};

type patient_contactTable = {
  priority: number;
  function: string | null;
  relation: string | null;
  patient_administration_information_identifier: number;
  administration_contact_identifier: number;
  identifier: number;
};

type patient_groupTable = {
  code: string;
  identifier: number;
};

type patient_identificationTable = {
  key: string;
  value: string;
  patient_identifier: number;
  cas_version: number;
  identifier: number;
};

type patient_infoTable = {
  patient_identifier: number;
  nickname: string | null;
  birthdate: joda.LocalDate | null;
  birthplace: string | null;
  admission_date: joda.Instant | null;
  depart_date: joda.Instant | null;
  decease_date: joda.Instant | null;
  doctor_name: string | null;
  doctor_phone: string | null;
  general_remarks: string | null;
  medical_remarks: string | null;
  blood_type: t_blood_type | null;
  diet: string | null;
  nat_number: string | null;
  healthservice_number: string | null;
  katz_score: string | null;
  is_diabetic: boolean | null;
  is_epileptic: boolean | null;
  is_palliative: boolean | null;
  has_angor: boolean | null;
  has_pacemaker: boolean | null;
  has_coagulationdisorder: boolean | null;
  has_copd: boolean | null;
  dementia_stage: dementia_stage | null;
  food_allergies: string | null;
  medicine_allergies: string | null;
  other_allergies: string | null;
  dnr: boolean | null;
  dnrdescription: string | null;
  constraints: string | null;
  identifier: number;
};

type patient_medical_informationTable = {
  diet: string | null;
  general: string | null;
  general_practitioner_identifier: number | null;
  blood_type_identifier: number | null;
  dementia_identifier: number | null;
  blood_type: t_blood_type | null;
  identifier: number;
};

type patient_sessionTable = {
  tasks_performed: boolean;
  timestamp_enter: joda.Instant;
  timestamp_leave: joda.Instant | null;
  care_session_identifier: number | null;
  patient_identifier: number;
  identifier: number;
};

type patient_social_informationTable = {
  instagram_token: string | null;
  general: string | null;
  identifier: number;
};

type periodTable = {
  name: string;
  start_time: joda.LocalTime;
  end_time: joda.LocalTime;
  identifier: number;
};

type pictureTable = {
  name: string;
  data: Buffer;
  mimetype: string;
  identifier: number;
};

type planned_care_actionTable = {
  utc_timestamp: joda.Instant;
  care_action_identifier: number;
  patient_identifier: number;
  remarks: string | null;
  authorization_type: authorization_type;
  identifier: number;
};

type planned_measurementTable = {
  measurement_type: measurement_type;
  patient_identifier: number;
  utc_timestamp: joda.Instant;
  remarks: string | null;
  identifier: number;
};

type planned_medicationTable = {
  patient_identifier: number;
  phase: medication_phase;
  remarks: string | null;
  utc_timestamp: joda.Instant;
  identifier: number;
};

type planned_medication_detailTable = {
  planned_medication_identifier: number;
  medication_type_identifier: number;
  dosage: number;
  identifier: number;
};

type possible_service_functionTable = {
  code: string;
  identifier: number;
};

type possible_work_orderTable = {
  name: string;
  code: string;
  possible_work_order_top_identifier: number;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type possible_work_order_topTable = {
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type predefined_broadcast_callTable = {
  name: string;
  sound: string;
  identifier: number;
};

type processTable = {
  name: string;
  site_identifier: number;
  mis_connection_identifier: number | null;
  identifier: number;
};

type process_boot_cycleTable = {
  version: string;
  build: string;
  timestamp: joda.Instant;
  process_identifier: number | null;
  identifier: number;
};

type radioTable = {
  name: string;
  avatar: string;
  stream: string;
  priority: number;
  identifier: number;
};

type remote_alarmTable = {
  created: joda.Instant;
  trusted_device_identifier: number | null;
  sui_status_identifier: number | null;
  patient_identifier: number;
  identifier: number;
};

type rf_moduleTable = {
  serial: number;
  brand_identifier: number;
  type_identifier: number;
  patient_identifier: number | null;
  location_identifier: number | null;
  activity_timestamp: joda.Instant | null;
  activity_data: string | null;
  cas_mode: cas_mode;
  cas_version: number;
  battery_low: boolean | null;
  identifier: number;
};

type roleTable = {
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type roomTable = {
  name: string;
  code: string;
  location_identifier: number;
  identifier: number;
};

type sectionTable = {
  name: string;
  code: string;
  identifier: number;
};

type service_functionTable = {
  timestamp_enter: joda.Instant;
  timestamp_leave: joda.Instant | null;
  employee_identifier: number | null;
  possible_service_function_identifier: number | null;
  identifier: number;
};

type settingTable = {
  key: string;
  value: string;
  description: string;
  site_identifier: number | null;
  process_identifier: number | null;
  identifier: number;
};

type shortcutTable = {
  name: string;
  icon: string;
  url: string;
  type: shortcut_type;
  position: number;
  cas_mode: cas_mode;
  cas_version: number;
  picture_identifier: number | null;
  patient_can_view: boolean;
  identifier: number;
};

type shortcut_roleTable = {
  shortcut_identifier: number | null;
  role_identifier: number | null;
  identifier: number;
};

type siteTable = {
  name: string;
  identifier: number;
};

type spectralink_accountTable = {
  number: string;
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type spectralink_groupTable = {
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};

type spectralink_messageTable = {
  external_identifier: number;
  key: string;
  action: number | null;
  parameters: any;
  scheduled_at: joda.Instant;
  sent_at: joda.Instant | null;
  deleted_at: joda.Instant | null;
  expired_at: joda.Instant;
  account_identifier: number;
  created_at: joda.Instant;
  identifier: number;
};

type spectralink_message_queueTable = {
  guid: string;
  engine_event_identifier: number;
  message: string;
  action: number;
  response: number;
  color: number;
  alerttone: number;
  alertvolume: number;
  alerttimeout: number;
  callback: number;
  account_identifier: number;
  created_at: joda.Instant;
  sent_at: joda.Instant | null;
  delivered_at: joda.Instant | null;
  man_ack_at: joda.Instant | null;
  deleted: boolean;
  deletion_sent_at: joda.Instant | null;
  deletion_confirmed_at: joda.Instant | null;
  identifier: number;
};

type spectralink_message_referenceTable = {
  key: string;
  engine_call_action_message_identifier: number;
  context_location_identifier: number | null;
  tag: string | null;
  identifier: number;
};

type state_causeTable = {
  type: number;
  id_lsb: number | null;
  id_msb: number | null;
  description: string;
  device_identifier: number | null;
  state_cause_template_identifier: number | null;
  identifier: number;
};

type state_cause_templateTable = {
  priority: number;
  name: string;
  identifier: number;
};

type state_machine_change_action_configTable = {
  state_machine: number;
  state_machine_state: number;
  action_config_identifier: number;
  identifier: number;
};

type state_machine_stateTable = {
  state_machine: number;
  state: number;
  device_identifier: number | null;
  identifier: number;
};

type status_appTable = {
  identifier: number;
};

type status_dectTable = {
  beep: number;
  type: number;
  priority: number;
  identifier: number;
};

type stringTable = {
  value: string;
  bluetooth_device_identifier: number | null;
  identifier: number;
};

type sui_patient_infoTable = {
  password: string | null;
  info_url: string | null;
  instagram_api_token: string | null;
  show_instagram_on_screensaver: boolean;
  patient_identifier: number;
  identifier: number;
};

type sui_statusTable = {
  code: string;
  name: string;
  linked_with_location: boolean;
  read_only: boolean;
  home: boolean;
  last_active: joda.Instant;
  patient_identifier: number;
  image_identifier: number | null;
  identifier: number;
};

type sui_status_triggerTable = {
  created: joda.Instant;
  code: string;
  name: string;
  active: boolean;
  patient_identifier: number;
  on_connected_identifier: number | null;
  on_disconnected_identifier: number | null;
  wifi_network_identifier: number | null;
  bluetooth_device_identifier: number | null;
  identifier: number;
};

type supplementTable = {
  code: string;
  description: string;
  identifier: number;
};

type supplement_registrationTable = {
  count: number;
  comment: string | null;
  timestamp: joda.Instant;
  supplement_identifier: number | null;
  patient_identifier: number | null;
  employee_identifier: number | null;
  identifier: number;
};

type task_typeTable = {
  type: string;
  identifier: number;
};

type translationTable = {
  translation_key: string;
  en: string | null;
  nl: string | null;
  fr: string | null;
  ru: string | null;
  de: string | null;
  identifier: number;
};

type trusted_deviceTable = {
  code: string;
  name: string;
  platform: string;
  software_version: string;
  created: joda.Instant;
  last_used: joda.Instant;
  identifier: number;
};

type ui_accessTable = {
  platform: string;
  view: string;
  priority: number;
  identifier: number;
};

type version_historyTable = {
  installed_version: string;
  installed_on: joda.LocalDateTime | null;
  identifier: number;
};

type webrtc_accountTable = {
  type: string;
  display_name: string;
  number: string;
  domain: string;
  ws_servers: string;
  authorization_user: string;
  password: string;
  location_identifier: number | null;
  camera_identifier: number | null;
  device_identifier: number | null;
  employee_identifier: number | null;
  patient_identifier: number | null;
  identifier: number;
};

type wifi_networkTable = {
  ssid: string;
  identifier: number;
};

type work_orderTable = {
  status: number;
  comment: string;
  timestamp: joda.Instant;
  timestamp_solved: joda.Instant | null;
  possible_work_order_identifier: number;
  patient_identifier: number;
  employee_identifier: number | null;
  mailed_at: joda.Instant | null;
  identifier: number;
};

type yunction_logTable = {
  utc_timestamp: joda.Instant;
  application_name: string;
  remarks: string | null;
  details: string | null;
  sent_home_on: joda.Instant | null;
  identifier: number;
};
