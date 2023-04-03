import * as joda from "@js-joda/core";
import { FieldDef } from ".";
import { DB, TableDef } from ".";

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

type access_control_access_door_group_table = {
  access_control_identifier: number;
  access_door_group_identifier: number;
};
type access_control_access_door_group_def = TableDef<
  "access_control_access_door_group",
  {
    access_control_identifier: FieldDef<number>;
    access_door_group_identifier: FieldDef<number>;
  }
>;
const access_control_access_door_group_def: access_control_access_door_group_def =
  {
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
  };

type access_door_table = {
  name: string;
  device_identifier: number;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type access_door_def = TableDef<
  "access_door",
  {
    name: FieldDef<string>;
    device_identifier: FieldDef<number>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const access_door_def: access_door_def = {
  __meta: {
    name: "access_door",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type access_door_access_control_table = {
  access_door_identifier: number;
  access_control_identifier: number;
};
type access_door_access_control_def = TableDef<
  "access_door_access_control",
  {
    access_door_identifier: FieldDef<number>;
    access_control_identifier: FieldDef<number>;
  }
>;
const access_door_access_control_def: access_door_access_control_def = {
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
};

type access_door_access_group_table = {
  access_door_identifier: number;
  access_group_identifier: number;
};
type access_door_access_group_def = TableDef<
  "access_door_access_group",
  {
    access_door_identifier: FieldDef<number>;
    access_group_identifier: FieldDef<number>;
  }
>;
const access_door_access_group_def: access_door_access_group_def = {
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
};

type access_door_door_procedure_table = {
  access_door_identifier: number;
  door_procedure_identifier: number;
};
type access_door_door_procedure_def = TableDef<
  "access_door_door_procedure",
  {
    access_door_identifier: FieldDef<number>;
    door_procedure_identifier: FieldDef<number>;
  }
>;
const access_door_door_procedure_def: access_door_door_procedure_def = {
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
};

type access_door_group_access_group_table = {
  access_door_group_identifier: number;
  access_group_identifier: number;
};
type access_door_group_access_group_def = TableDef<
  "access_door_group_access_group",
  {
    access_door_group_identifier: FieldDef<number>;
    access_group_identifier: FieldDef<number>;
  }
>;
const access_door_group_access_group_def: access_door_group_access_group_def = {
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
};

type access_group_table = {
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type access_group_def = TableDef<
  "access_group",
  {
    name: FieldDef<string>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const access_group_def: access_group_def = {
  __meta: {
    name: "access_group",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type access_group_badge_table = {
  access_group_identifier: number;
  badge_identifier: number;
};
type access_group_badge_def = TableDef<
  "access_group_badge",
  {
    access_group_identifier: FieldDef<number>;
    badge_identifier: FieldDef<number>;
  }
>;
const access_group_badge_def: access_group_badge_def = {
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
};

type action_config_table = {
  identifier: number;
};
type action_config_def = TableDef<
  "action_config",
  {
    identifier: FieldDef<number>;
  }
>;
const action_config_def: action_config_def = {
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
};

type action_config_dect_to_crews_of_location_table = {
  dect_type: number;
  dect_beep: number;
  dect_priority: number;
  message: string;
  action_config_identifier: number;
  only_to_employees_on_duty: boolean;
  identifier: number;
};
type action_config_dect_to_crews_of_location_def = TableDef<
  "action_config_dect_to_crews_of_location",
  {
    dect_type: FieldDef<number>;
    dect_beep: FieldDef<number>;
    dect_priority: FieldDef<number>;
    message: FieldDef<string>;
    action_config_identifier: FieldDef<number>;
    only_to_employees_on_duty: FieldDef<boolean>;
    identifier: FieldDef<number>;
  }
>;
const action_config_dect_to_crews_of_location_def: action_config_dect_to_crews_of_location_def =
  {
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
  };

type action_config_dect_to_crews_of_location_role_table = {
  action_config_dect_to_crews_of_location_identifier: number;
  role_identifier: number;
  identifier: number;
};
type action_config_dect_to_crews_of_location_role_def = TableDef<
  "action_config_dect_to_crews_of_location_role",
  {
    action_config_dect_to_crews_of_location_identifier: FieldDef<number>;
    role_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const action_config_dect_to_crews_of_location_role_def: action_config_dect_to_crews_of_location_role_def =
  {
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
  };

type action_config_dect_to_group_table = {
  dect_type: number;
  dect_beep: number;
  dect_priority: number;
  message: string;
  action_config_identifier: number;
  identifier: number;
};
type action_config_dect_to_group_def = TableDef<
  "action_config_dect_to_group",
  {
    dect_type: FieldDef<number>;
    dect_beep: FieldDef<number>;
    dect_priority: FieldDef<number>;
    message: FieldDef<string>;
    action_config_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const action_config_dect_to_group_def: action_config_dect_to_group_def = {
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
};

type action_config_dect_to_group_dect_group_table = {
  action_config_dect_to_group_identifier: number;
  dect_group_identifier: number;
  identifier: number;
};
type action_config_dect_to_group_dect_group_def = TableDef<
  "action_config_dect_to_group_dect_group",
  {
    action_config_dect_to_group_identifier: FieldDef<number>;
    dect_group_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const action_config_dect_to_group_dect_group_def: action_config_dect_to_group_dect_group_def =
  {
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
  };

type action_config_spectralink_to_crews_of_location_table = {
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
type action_config_spectralink_to_crews_of_location_def = TableDef<
  "action_config_spectralink_to_crews_of_location",
  {
    message: FieldDef<string>;
    spectralink_action: FieldDef<number>;
    spectralink_response: FieldDef<number>;
    spectralink_color: FieldDef<number>;
    spectralink_alerttone: FieldDef<number>;
    spectralink_alertvolume: FieldDef<number>;
    spectralink_alerttimeout: FieldDef<number>;
    spectralink_callback: FieldDef<number>;
    action_config_identifier: FieldDef<number>;
    only_to_employees_on_duty: FieldDef<boolean>;
    identifier: FieldDef<number>;
  }
>;
const action_config_spectralink_to_crews_of_location_def: action_config_spectralink_to_crews_of_location_def =
  {
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
  };

type action_config_spectralink_to_crews_of_location_role_table = {
  action_config_spectralink_to_crews_of_location_identifier: number;
  role_identifier: number;
  identifier: number;
};
type action_config_spectralink_to_crews_of_location_role_def = TableDef<
  "action_config_spectralink_to_crews_of_location_role",
  {
    action_config_spectralink_to_crews_of_location_identifier: FieldDef<number>;
    role_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const action_config_spectralink_to_crews_of_location_role_def: action_config_spectralink_to_crews_of_location_role_def =
  {
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
  };

type action_config_spectralink_to_group_table = {
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
type action_config_spectralink_to_group_def = TableDef<
  "action_config_spectralink_to_group",
  {
    message: FieldDef<string>;
    spectralink_action: FieldDef<number>;
    spectralink_response: FieldDef<number>;
    spectralink_color: FieldDef<number>;
    spectralink_alerttone: FieldDef<number>;
    spectralink_alertvolume: FieldDef<number>;
    spectralink_alerttimeout: FieldDef<number>;
    spectralink_callback: FieldDef<number>;
    action_config_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const action_config_spectralink_to_group_def: action_config_spectralink_to_group_def =
  {
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
  };

type action_config_spectralink_to_group_spectralink_group_table = {
  action_config_spectralink_to_group_identifier: number;
  spectralink_group_identifier: number;
  identifier: number;
};
type action_config_spectralink_to_group_spectralink_group_def = TableDef<
  "action_config_spectralink_to_group_spectralink_group",
  {
    action_config_spectralink_to_group_identifier: FieldDef<number>;
    spectralink_group_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const action_config_spectralink_to_group_spectralink_group_def: action_config_spectralink_to_group_spectralink_group_def =
  {
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
  };

type activity_table = {
  active: boolean;
  crew_identifier: number;
  employee_identifier: number;
  role_identifier: number;
  position: number;
  cas_version: number;
  identifier: number;
};
type activity_def = TableDef<
  "activity",
  {
    active: FieldDef<boolean>;
    crew_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number>;
    role_identifier: FieldDef<number>;
    position: FieldDef<number>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const activity_def: activity_def = {
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
};

type address_table = {
  address: string;
  street_number: string;
  city: string;
  zip_code: string;
  country: string | null;
  contact_identifier: number | null;
  identifier: number;
};
type address_def = TableDef<
  "address",
  {
    address: FieldDef<string>;
    street_number: FieldDef<string>;
    city: FieldDef<string>;
    zip_code: FieldDef<string>;
    country: FieldDef<string | null>;
    contact_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const address_def: address_def = {
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
    city: { name: "city", type: { kind: "scalar", name: { name: "text" } } },
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
};

type administration_contact_table = {
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
type administration_contact_def = TableDef<
  "administration_contact",
  {
    name: FieldDef<string | null>;
    first_name: FieldDef<string | null>;
    telephone: FieldDef<string | null>;
    telephone2: FieldDef<string | null>;
    gsm: FieldDef<string | null>;
    fax: FieldDef<string | null>;
    email: FieldDef<string | null>;
    website: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const administration_contact_def: administration_contact_def = {
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
};

type allergy_table = {
  name: string;
  identifier: number;
};
type allergy_def = TableDef<
  "allergy",
  {
    name: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const allergy_def: allergy_def = {
  __meta: {
    name: "allergy",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type api_login_table = {
  login_identifier: string;
  password: string;
  employee_identifier: number | null;
  process_identifier: number | null;
  management_account_identifier: number | null;
  patient_identifier: number | null;
  device_identifier: number | null;
  identifier: number;
};
type api_login_def = TableDef<
  "api_login",
  {
    login_identifier: FieldDef<string>;
    password: FieldDef<string>;
    employee_identifier: FieldDef<number | null>;
    process_identifier: FieldDef<number | null>;
    management_account_identifier: FieldDef<number | null>;
    patient_identifier: FieldDef<number | null>;
    device_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const api_login_def: api_login_def = {
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
};

type api_token_table = {
  token: string;
  profile: string;
  start_time: joda.Instant;
  end_time: joda.Instant;
  api_login_identifier: number;
  identifier: number;
};
type api_token_def = TableDef<
  "api_token",
  {
    token: FieldDef<string>;
    profile: FieldDef<string>;
    start_time: FieldDef<joda.Instant>;
    end_time: FieldDef<joda.Instant>;
    api_login_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const api_token_def: api_token_def = {
  __meta: {
    name: "api_token",
    schema: "public",
  },
  fields: {
    token: { name: "token", type: { kind: "scalar", name: { name: "text" } } },
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
};

type app_message_table = {
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
type app_message_def = TableDef<
  "app_message",
  {
    message: FieldDef<string>;
    status: FieldDef<number>;
    type: FieldDef<number>;
    delete_status: FieldDef<number>;
    timestamp_sent: FieldDef<joda.Instant | null>;
    timestamp_delivered: FieldDef<joda.Instant | null>;
    timestamp_man_ack: FieldDef<joda.Instant | null>;
    engine_call_action_message_identifier: FieldDef<number | null>;
    employee_identifier: FieldDef<number>;
    context_location_identifier: FieldDef<number | null>;
    tag: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const app_message_def: app_message_def = {
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
    type: { name: "type", type: { kind: "scalar", name: { name: "integer" } } },
    delete_status: {
      name: "delete_status",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    timestamp_sent: {
      name: "timestamp_sent",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    timestamp_delivered: {
      name: "timestamp_delivered",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    timestamp_man_ack: {
      name: "timestamp_man_ack",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type application_global_table = {
  comfort_during_night: boolean;
  embezzlement_time: number;
  device_identifier: number;
  identifier: number;
};
type application_global_def = TableDef<
  "application_global",
  {
    comfort_during_night: FieldDef<boolean>;
    embezzlement_time: FieldDef<number>;
    device_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const application_global_def: application_global_def = {
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
};

type application_svp_table = {
  view_in_screensaver: boolean;
  pursuit_enabled: boolean;
  device_identifier: number;
  esvp_device_identifier: number;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type application_svp_def = TableDef<
  "application_svp",
  {
    view_in_screensaver: FieldDef<boolean>;
    pursuit_enabled: FieldDef<boolean>;
    device_identifier: FieldDef<number>;
    esvp_device_identifier: FieldDef<number>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const application_svp_def: application_svp_def = {
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
};

type application_svp_crews_table = {
  application_svp_identifier: number;
  crew_identifier: number;
};
type application_svp_crews_def = TableDef<
  "application_svp_crews",
  {
    application_svp_identifier: FieldDef<number>;
    crew_identifier: FieldDef<number>;
  }
>;
const application_svp_crews_def: application_svp_crews_def = {
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
};

type application_svp_status_table = {
  application_svp_identifier: number;
  status_identifier: number;
};
type application_svp_status_def = TableDef<
  "application_svp_status",
  {
    application_svp_identifier: FieldDef<number>;
    status_identifier: FieldDef<number>;
  }
>;
const application_svp_status_def: application_svp_status_def = {
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
};

type appointment_table = {
  start_date: joda.Instant;
  end_date: joda.Instant;
  description: string;
  location: string;
  patient_identifier: number;
  employee_identifier: number | null;
  identifier: number;
};
type appointment_def = TableDef<
  "appointment",
  {
    start_date: FieldDef<joda.Instant>;
    end_date: FieldDef<joda.Instant>;
    description: FieldDef<string>;
    location: FieldDef<string>;
    patient_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const appointment_def: appointment_def = {
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
};

type badge_table = {
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
type badge_def = TableDef<
  "badge",
  {
    serial: FieldDef<string>;
    timestamp: FieldDef<joda.Instant>;
    updated: FieldDef<joda.Instant>;
    employee_identifier: FieldDef<number | null>;
    patient_identifier: FieldDef<number | null>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    priority: FieldDef<boolean>;
    identifier: FieldDef<number>;
  }
>;
const badge_def: badge_def = {
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
};

type blood_type_table = {
  name: string;
  rhesus: string;
  identifier: number;
};
type blood_type_def = TableDef<
  "blood_type",
  {
    name: FieldDef<string>;
    rhesus: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const blood_type_def: blood_type_def = {
  __meta: {
    name: "blood_type",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    rhesus: {
      name: "rhesus",
      type: { kind: "scalar", name: { name: "text" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type bluetooth_device_table = {
  code: string;
  name: string;
  type: number;
  identifier: number;
};
type bluetooth_device_def = TableDef<
  "bluetooth_device",
  {
    code: FieldDef<string>;
    name: FieldDef<string>;
    type: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const bluetooth_device_def: bluetooth_device_def = {
  __meta: {
    name: "bluetooth_device",
    schema: "public",
  },
  fields: {
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    type: { name: "type", type: { kind: "scalar", name: { name: "integer" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type broadcast_call_table = {
  timestamp: joda.Instant;
  sound: string;
  employee_identifier: number | null;
  identifier: number;
};
type broadcast_call_def = TableDef<
  "broadcast_call",
  {
    timestamp: FieldDef<joda.Instant>;
    sound: FieldDef<string>;
    employee_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const broadcast_call_def: broadcast_call_def = {
  __meta: {
    name: "broadcast_call",
    schema: "public",
  },
  fields: {
    timestamp: {
      name: "timestamp",
      type: { kind: "scalar", name: { name: "timestamp with time zone" } },
    },
    sound: { name: "sound", type: { kind: "scalar", name: { name: "text" } } },
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
};

type broadcast_call_broadcast_call_group_table = {
  broadcast_call_identifier: number;
  broadcast_call_group_identifier: number;
};
type broadcast_call_broadcast_call_group_def = TableDef<
  "broadcast_call_broadcast_call_group",
  {
    broadcast_call_identifier: FieldDef<number>;
    broadcast_call_group_identifier: FieldDef<number>;
  }
>;
const broadcast_call_broadcast_call_group_def: broadcast_call_broadcast_call_group_def =
  {
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
  };

type broadcast_call_group_table = {
  name: string;
  identifier: number;
};
type broadcast_call_group_def = TableDef<
  "broadcast_call_group",
  {
    name: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const broadcast_call_group_def: broadcast_call_group_def = {
  __meta: {
    name: "broadcast_call_group",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type broadcast_call_group_device_table = {
  broadcast_call_group_identifier: number;
  device_identifier: number;
};
type broadcast_call_group_device_def = TableDef<
  "broadcast_call_group_device",
  {
    broadcast_call_group_identifier: FieldDef<number>;
    device_identifier: FieldDef<number>;
  }
>;
const broadcast_call_group_device_def: broadcast_call_group_device_def = {
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
};

type call_reason_table = {
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
type call_reason_def = TableDef<
  "call_reason",
  {
    tag: FieldDef<string>;
    created_at: FieldDef<joda.Instant>;
    source: FieldDef<string>;
    comment: FieldDef<string | null>;
    call_reason_category_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number | null>;
    location_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const call_reason_def: call_reason_def = {
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
};

type call_reason_category_table = {
  prefix: string | null;
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  type: call_reason_category_type;
  identifier: number;
};
type call_reason_category_def = TableDef<
  "call_reason_category",
  {
    prefix: FieldDef<string | null>;
    name: FieldDef<string>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    type: FieldDef<call_reason_category_type>;
    identifier: FieldDef<number>;
  }
>;
const call_reason_category_def: call_reason_category_def = {
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
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type callback_queue_table = {
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
type callback_queue_def = TableDef<
  "callback_queue",
  {
    callback_category: FieldDef<callback_category | null>;
    location_call_callback_identifier: FieldDef<number>;
    url: FieldDef<string>;
    headers: FieldDef<any | null>;
    body: FieldDef<any | null>;
    last_send: FieldDef<joda.Instant | null>;
    tries: FieldDef<number>;
    status: FieldDef<callback_status>;
    identifier: FieldDef<number>;
  }
>;
const callback_queue_def: callback_queue_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type camera_table = {
  location: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type camera_def = TableDef<
  "camera",
  {
    location: FieldDef<string>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const camera_def: camera_def = {
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
};

type care_table = {
  timestamp: joda.Instant;
  state: number;
  state_cause_identifier: number | null;
  status_identifier: number;
  identifier: number;
};
type care_def = TableDef<
  "care",
  {
    timestamp: FieldDef<joda.Instant>;
    state: FieldDef<number>;
    state_cause_identifier: FieldDef<number | null>;
    status_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const care_def: care_def = {
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
};

type care_action_table = {
  groupname: string | null;
  name: string;
  plannedonly: boolean;
  authorization_type: authorization_type;
  identifier: number;
};
type care_action_def = TableDef<
  "care_action",
  {
    groupname: FieldDef<string | null>;
    name: FieldDef<string>;
    plannedonly: FieldDef<boolean>;
    authorization_type: FieldDef<authorization_type>;
    identifier: FieldDef<number>;
  }
>;
const care_action_def: care_action_def = {
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
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type care_action_signature_table = {
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
type care_action_signature_def = TableDef<
  "care_action_signature",
  {
    utc_timestamp: FieldDef<joda.Instant>;
    care_action_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number>;
    done: FieldDef<boolean>;
    reason_notdone: FieldDef<string | null>;
    planned_care_action_identifier: FieldDef<number | null>;
    remarks: FieldDef<string | null>;
    synced_on: FieldDef<joda.Instant | null>;
    identifier: FieldDef<number>;
  }
>;
const care_action_signature_def: care_action_signature_def = {
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
    done: { name: "done", type: { kind: "scalar", name: { name: "boolean" } } },
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type care_session_table = {
  endpoint: number;
  timestamp_enter: joda.Instant;
  timestamp_leave: joda.Instant | null;
  locked: boolean;
  care_identifier: number;
  employee_identifier: number;
  identifier: number;
};
type care_session_def = TableDef<
  "care_session",
  {
    endpoint: FieldDef<number>;
    timestamp_enter: FieldDef<joda.Instant>;
    timestamp_leave: FieldDef<joda.Instant | null>;
    locked: FieldDef<boolean>;
    care_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const care_session_def: care_session_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type cas_audit_log_table = {
  transaction: number;
  relation: string;
  operation: string;
  old: any | null;
  new: any | null;
  source: string | null;
  executed_at: joda.Instant;
};
type cas_audit_log_def = TableDef<
  "cas_audit_log",
  {
    transaction: FieldDef<number>;
    relation: FieldDef<string>;
    operation: FieldDef<string>;
    old: FieldDef<any | null>;
    new: FieldDef<any | null>;
    source: FieldDef<string | null>;
    executed_at: FieldDef<joda.Instant>;
  }
>;
const cas_audit_log_def: cas_audit_log_def = {
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
};

type cas_notification_table = {
  category: string;
  payload: any;
};
type cas_notification_def = TableDef<
  "cas_notification",
  {
    category: FieldDef<string>;
    payload: FieldDef<any>;
  }
>;
const cas_notification_def: cas_notification_def = {
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
};

type cas_report_table = {
  key: string;
  meta: any;
  visible: boolean;
};
type cas_report_def = TableDef<
  "cas_report",
  {
    key: FieldDef<string>;
    meta: FieldDef<any>;
    visible: FieldDef<boolean>;
  }
>;
const cas_report_def: cas_report_def = {
  __meta: {
    name: "cas_report",
    schema: "public",
  },
  fields: {
    key: { name: "key", type: { kind: "scalar", name: { name: "text" } } },
    meta: { name: "meta", type: { kind: "scalar", name: { name: "json" } } },
    visible: {
      name: "visible",
      type: { kind: "scalar", name: { name: "boolean" } },
    },
  },
};

type cas_session_table = {
  identifier: string;
  employee_identifier: number;
  created_at: joda.Instant;
  refreshed_at: joda.Instant;
};
type cas_session_def = TableDef<
  "cas_session",
  {
    identifier: FieldDef<string>;
    employee_identifier: FieldDef<number>;
    created_at: FieldDef<joda.Instant>;
    refreshed_at: FieldDef<joda.Instant>;
  }
>;
const cas_session_def: cas_session_def = {
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
};

type com_port_table = {
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
type com_port_def = TableDef<
  "com_port",
  {
    port: FieldDef<string>;
    baudrate: FieldDef<number>;
    parity: FieldDef<number>;
    databits: FieldDef<number>;
    stopbits: FieldDef<number>;
    active: FieldDef<boolean>;
    control_station: FieldDef<boolean>;
    local_address: FieldDef<number>;
    remote_address: FieldDef<number>;
    support_sync_for_poll: FieldDef<boolean>;
    support_remote_management: FieldDef<boolean>;
    support_message_identifier: FieldDef<boolean>;
    support_running_number: FieldDef<boolean>;
    distributed_messaging_delay: FieldDef<number>;
    expire_message_after: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const com_port_def: com_port_def = {
  __meta: {
    name: "com_port",
    schema: "public",
  },
  fields: {
    port: { name: "port", type: { kind: "scalar", name: { name: "text" } } },
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
};

type contact_table = {
  timestamp: joda.Instant;
  webrtc_account_identifier: number;
  contact_list_identifier: number;
  identifier: number;
};
type contact_def = TableDef<
  "contact",
  {
    timestamp: FieldDef<joda.Instant>;
    webrtc_account_identifier: FieldDef<number>;
    contact_list_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const contact_def: contact_def = {
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
};

type contact_list_table = {
  type: number;
  employee_identifier: number | null;
  crew_identifier: number | null;
  identifier: number;
};
type contact_list_def = TableDef<
  "contact_list",
  {
    type: FieldDef<number>;
    employee_identifier: FieldDef<number | null>;
    crew_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const contact_list_def: contact_list_def = {
  __meta: {
    name: "contact_list",
    schema: "public",
  },
  fields: {
    type: { name: "type", type: { kind: "scalar", name: { name: "integer" } } },
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
};

type crew_table = {
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type crew_def = TableDef<
  "crew",
  {
    name: FieldDef<string>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const crew_def: crew_def = {
  __meta: {
    name: "crew",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type crew_location_table = {
  crew_identifier: number;
  location_identifier: number;
};
type crew_location_def = TableDef<
  "crew_location",
  {
    crew_identifier: FieldDef<number>;
    location_identifier: FieldDef<number>;
  }
>;
const crew_location_def: crew_location_def = {
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
};

type day_night_table = {
  timestamp: joda.Instant;
  description: string;
  remarks: string;
  patient_identifier: number;
  employee_identifier: number;
  period_identifier: number | null;
  identifier: number;
};
type day_night_def = TableDef<
  "day_night",
  {
    timestamp: FieldDef<joda.Instant>;
    description: FieldDef<string>;
    remarks: FieldDef<string>;
    patient_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number>;
    period_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const day_night_def: day_night_def = {
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
};

type dect_account_table = {
  name: string;
  number: number;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type dect_account_def = TableDef<
  "dect_account",
  {
    name: FieldDef<string>;
    number: FieldDef<number>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const dect_account_def: dect_account_def = {
  __meta: {
    name: "dect_account",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type dect_group_table = {
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type dect_group_def = TableDef<
  "dect_group",
  {
    name: FieldDef<string>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const dect_group_def: dect_group_def = {
  __meta: {
    name: "dect_group",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type dect_group_dect_account_table = {
  dect_group_identifier: number;
  dect_account_identifier: number;
};
type dect_group_dect_account_def = TableDef<
  "dect_group_dect_account",
  {
    dect_group_identifier: FieldDef<number>;
    dect_account_identifier: FieldDef<number>;
  }
>;
const dect_group_dect_account_def: dect_group_dect_account_def = {
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
};

type dect_group_location_table = {
  dect_group_identifier: number;
  location_identifier: number;
};
type dect_group_location_def = TableDef<
  "dect_group_location",
  {
    dect_group_identifier: FieldDef<number>;
    location_identifier: FieldDef<number>;
  }
>;
const dect_group_location_def: dect_group_location_def = {
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
};

type dect_message_table = {
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
type dect_message_def = TableDef<
  "dect_message",
  {
    message: FieldDef<string>;
    beep: FieldDef<number>;
    type: FieldDef<number>;
    priority: FieldDef<number>;
    status: FieldDef<number>;
    delete_status: FieldDef<number>;
    timestamp_sent: FieldDef<joda.Instant | null>;
    timestamp_delivered: FieldDef<joda.Instant | null>;
    timestamp_man_ack: FieldDef<joda.Instant | null>;
    engine_call_action_message_identifier: FieldDef<number | null>;
    account_identifier: FieldDef<number>;
    callback_account_identifier: FieldDef<number | null>;
    created_at: FieldDef<joda.Instant>;
    scheduled_at: FieldDef<joda.Instant>;
    expired_at: FieldDef<joda.Instant | null>;
    context_location_identifier: FieldDef<number | null>;
    tag: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const dect_message_def: dect_message_def = {
  __meta: {
    name: "dect_message",
    schema: "public",
  },
  fields: {
    message: {
      name: "message",
      type: { kind: "scalar", name: { name: "text" } },
    },
    beep: { name: "beep", type: { kind: "scalar", name: { name: "integer" } } },
    type: { name: "type", type: { kind: "scalar", name: { name: "integer" } } },
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    timestamp_delivered: {
      name: "timestamp_delivered",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    timestamp_man_ack: {
      name: "timestamp_man_ack",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type dect_message_queue_table = {
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
type dect_message_queue_def = TableDef<
  "dect_message_queue",
  {
    guid: FieldDef<string>;
    engine_event_identifier: FieldDef<number>;
    message: FieldDef<string>;
    beep: FieldDef<number>;
    type: FieldDef<number>;
    priority: FieldDef<number>;
    number: FieldDef<number>;
    created_at: FieldDef<joda.Instant>;
    sent_at: FieldDef<joda.Instant | null>;
    delivered_at: FieldDef<joda.Instant | null>;
    man_ack_at: FieldDef<joda.Instant | null>;
    deleted: FieldDef<boolean>;
    deletion_sent_at: FieldDef<joda.Instant | null>;
    deletion_confirmed_at: FieldDef<joda.Instant | null>;
    identifier: FieldDef<number>;
  }
>;
const dect_message_queue_def: dect_message_queue_def = {
  __meta: {
    name: "dect_message_queue",
    schema: "public",
  },
  fields: {
    guid: { name: "guid", type: { kind: "scalar", name: { name: "text" } } },
    engine_event_identifier: {
      name: "engine_event_identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    message: {
      name: "message",
      type: { kind: "scalar", name: { name: "text" } },
    },
    beep: { name: "beep", type: { kind: "scalar", name: { name: "integer" } } },
    type: { name: "type", type: { kind: "scalar", name: { name: "integer" } } },
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    delivered_at: {
      name: "delivered_at",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    man_ack_at: {
      name: "man_ack_at",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    deletion_confirmed_at: {
      name: "deletion_confirmed_at",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type default_text_table = {
  description: string;
  identifier: number;
};
type default_text_def = TableDef<
  "default_text",
  {
    description: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const default_text_def: default_text_def = {
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
};

type dementia_table = {
  name: string;
  identifier: number;
};
type dementia_def = TableDef<
  "dementia",
  {
    name: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const dementia_def: dementia_def = {
  __meta: {
    name: "dementia",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type department_table = {
  name: string;
  code: string;
  site_identifier: number;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type department_def = TableDef<
  "department",
  {
    name: FieldDef<string>;
    code: FieldDef<string>;
    site_identifier: FieldDef<number>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const department_def: department_def = {
  __meta: {
    name: "department",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
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
};

type device_table = {
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
type device_def = TableDef<
  "device",
  {
    serial: FieldDef<number>;
    name: FieldDef<string>;
    verklizan_location_identifier: FieldDef<number | null>;
    badge_mode: FieldDef<number>;
    application: FieldDef<number>;
    engine_device_configuration_profile_identifier: FieldDef<number | null>;
    location_identifier: FieldDef<number>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    verklizan_identifier: FieldDef<string | null>;
    application_parameters: FieldDef<any>;
    viedome_identifier: FieldDef<string | null>;
    use_newui: FieldDef<boolean | null>;
    identifier: FieldDef<number>;
  }
>;
const device_def: device_def = {
  __meta: {
    name: "device",
    schema: "public",
  },
  fields: {
    serial: {
      name: "serial",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type device_status_table = {
  name: string;
  state_machine: number;
  state_identifier: number;
  device_only: boolean;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type device_status_def = TableDef<
  "device_status",
  {
    name: FieldDef<string>;
    state_machine: FieldDef<number>;
    state_identifier: FieldDef<number>;
    device_only: FieldDef<boolean>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const device_status_def: device_status_def = {
  __meta: {
    name: "device_status",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type diary_table = {
  description: string | null;
  remarks: string;
  employee_identifier: number | null;
  username: string;
  created: joda.Instant;
  synced_on: joda.Instant | null;
  identifier: number;
};
type diary_def = TableDef<
  "diary",
  {
    description: FieldDef<string | null>;
    remarks: FieldDef<string>;
    employee_identifier: FieldDef<number | null>;
    username: FieldDef<string>;
    created: FieldDef<joda.Instant>;
    synced_on: FieldDef<joda.Instant | null>;
    identifier: FieldDef<number>;
  }
>;
const diary_def: diary_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type diary_patient_table = {
  diary_identifier: number;
  patient_identifier: number;
  identifier: number;
};
type diary_patient_def = TableDef<
  "diary_patient",
  {
    diary_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const diary_patient_def: diary_patient_def = {
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
};

type diary_read_table = {
  employee_identifier: number;
  patient_identifier: number;
  read_at: joda.Instant;
};
type diary_read_def = TableDef<
  "diary_read",
  {
    employee_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
    read_at: FieldDef<joda.Instant>;
  }
>;
const diary_read_def: diary_read_def = {
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
};

type door_procedure_table = {
  name: string;
  functionality: number;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type door_procedure_def = TableDef<
  "door_procedure",
  {
    name: FieldDef<string>;
    functionality: FieldDef<number>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const door_procedure_def: door_procedure_def = {
  __meta: {
    name: "door_procedure",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type email_table = {
  address: string;
  patient_identifier: number | null;
  employee_identifier: number | null;
  role_identifier: number | null;
  crew_identifier: number | null;
  cas_version: number;
  possible_work_order_top_identifier: number | null;
  identifier: number;
};
type email_def = TableDef<
  "email",
  {
    address: FieldDef<string>;
    patient_identifier: FieldDef<number | null>;
    employee_identifier: FieldDef<number | null>;
    role_identifier: FieldDef<number | null>;
    crew_identifier: FieldDef<number | null>;
    cas_version: FieldDef<number>;
    possible_work_order_top_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const email_def: email_def = {
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
};

type employee_table = {
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
type employee_def = TableDef<
  "employee",
  {
    name: FieldDef<string>;
    avatar: FieldDef<string | null>;
    dect_account_identifier: FieldDef<number | null>;
    fcm_account_identifier: FieldDef<number | null>;
    cms_code_one: FieldDef<string | null>;
    cms_code_two: FieldDef<string | null>;
    cms: FieldDef<string>;
    spectralink_account_identifier: FieldDef<number | null>;
    cas_language: FieldDef<string | null>;
    cas_user: FieldDef<string | null>;
    cas_password: FieldDef<string | null>;
    cas_permissions: FieldDef<any | null>;
    code: FieldDef<string>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const employee_def: employee_def = {
  __meta: {
    name: "employee",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
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
};

type employee_authorization_table = {
  employee_identifier: number;
  authorization_type: authorization_type;
};
type employee_authorization_def = TableDef<
  "employee_authorization",
  {
    employee_identifier: FieldDef<number>;
    authorization_type: FieldDef<authorization_type>;
  }
>;
const employee_authorization_def: employee_authorization_def = {
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
};

type engine_action_table = {
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
type engine_action_def = TableDef<
  "engine_action",
  {
    action: FieldDef<string>;
    engine_call_termination_identifier: FieldDef<number | null>;
    engine_call_action_viewpoint_notification_acknowledgment_identi: FieldDef<
      number | null
    >;
    engine_call_action_viewpoint_notification_termination_identifie: FieldDef<
      number | null
    >;
    engine_call_action_viewpoint_status_acknowledgment_identifier: FieldDef<
      number | null
    >;
    engine_call_action_viewpoint_status_termination_identifier: FieldDef<
      number | null
    >;
    engine_call_action_message_acknowledgment_identifier: FieldDef<
      number | null
    >;
    engine_call_action_message_rejection_identifier: FieldDef<number | null>;
    engine_call_action_message_termination_identifier: FieldDef<number | null>;
    engine_call_action_message_destination_employee_identifier: FieldDef<
      number | null
    >;
    engine_call_action_message_destination_dect_identifier: FieldDef<
      number | null
    >;
    engine_call_action_message_destination_email_identifier: FieldDef<
      number | null
    >;
    engine_call_action_message_destination_spectralink_identifier: FieldDef<
      number | null
    >;
    identifier: FieldDef<number>;
  }
>;
const engine_action_def: engine_action_def = {
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
      name: "engine_call_action_viewpoint_notification_acknowledgment_identi",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "integer" } },
      },
    },
    engine_call_action_viewpoint_notification_termination_identifie: {
      name: "engine_call_action_viewpoint_notification_termination_identifie",
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
};

type engine_call_table = {
  xtag: string;
  timestamp_requested: joda.Instant;
  timestamp_expired: joda.Instant;
  timestamp_executed: joda.Instant | null;
  identifier: number;
};
type engine_call_def = TableDef<
  "engine_call",
  {
    xtag: FieldDef<string>;
    timestamp_requested: FieldDef<joda.Instant>;
    timestamp_expired: FieldDef<joda.Instant>;
    timestamp_executed: FieldDef<joda.Instant | null>;
    identifier: FieldDef<number>;
  }
>;
const engine_call_def: engine_call_def = {
  __meta: {
    name: "engine_call",
    schema: "public",
  },
  fields: {
    xtag: { name: "xtag", type: { kind: "scalar", name: { name: "text" } } },
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type engine_call_action_table = {
  timestamp_requested: joda.Instant;
  timestamp_executed: joda.Instant | null;
  timestamp_processed: joda.Instant | null;
  engine_call_action_viewpoint_notification_identifier: number | null;
  engine_call_action_viewpoint_status_identifier: number | null;
  engine_call_action_message_identifier: number | null;
  engine_call_identifier: number;
  identifier: number;
};
type engine_call_action_def = TableDef<
  "engine_call_action",
  {
    timestamp_requested: FieldDef<joda.Instant>;
    timestamp_executed: FieldDef<joda.Instant | null>;
    timestamp_processed: FieldDef<joda.Instant | null>;
    engine_call_action_viewpoint_notification_identifier: FieldDef<
      number | null
    >;
    engine_call_action_viewpoint_status_identifier: FieldDef<number | null>;
    engine_call_action_message_identifier: FieldDef<number | null>;
    engine_call_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const engine_call_action_def: engine_call_action_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    timestamp_processed: {
      name: "timestamp_processed",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type engine_call_action_message_table = {
  text: string;
  identifier: number;
};
type engine_call_action_message_def = TableDef<
  "engine_call_action_message",
  {
    text: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const engine_call_action_message_def: engine_call_action_message_def = {
  __meta: {
    name: "engine_call_action_message",
    schema: "public",
  },
  fields: {
    text: { name: "text", type: { kind: "scalar", name: { name: "text" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type engine_call_action_message_app_table = {
  type: number;
  identifier: number;
};
type engine_call_action_message_app_def = TableDef<
  "engine_call_action_message_app",
  {
    type: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const engine_call_action_message_app_def: engine_call_action_message_app_def = {
  __meta: {
    name: "engine_call_action_message_app",
    schema: "public",
  },
  fields: {
    type: { name: "type", type: { kind: "scalar", name: { name: "integer" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type engine_call_action_message_dect_table = {
  type: number;
  priority: number;
  beep: number;
  identifier: number;
};
type engine_call_action_message_dect_def = TableDef<
  "engine_call_action_message_dect",
  {
    type: FieldDef<number>;
    priority: FieldDef<number>;
    beep: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const engine_call_action_message_dect_def: engine_call_action_message_dect_def =
  {
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
  };

type engine_call_action_message_destination_dect_table = {
  dect_group: string | null;
  engine_call_action_message_identifier: number;
  location_identifier: number | null;
  dect_account_identifier: number | null;
  settings_identifier: number | null;
  identifier: number;
};
type engine_call_action_message_destination_dect_def = TableDef<
  "engine_call_action_message_destination_dect",
  {
    dect_group: FieldDef<string | null>;
    engine_call_action_message_identifier: FieldDef<number>;
    location_identifier: FieldDef<number | null>;
    dect_account_identifier: FieldDef<number | null>;
    settings_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const engine_call_action_message_destination_dect_def: engine_call_action_message_destination_dect_def =
  {
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
  };

type engine_call_action_message_destination_email_table = {
  crew_identifier: number | null;
  employee_identifier: number | null;
  patient_identifier: number | null;
  location_identifier: number | null;
  engine_call_action_message_identifier: number;
  active: boolean;
  settings_identifier: number | null;
  identifier: number;
};
type engine_call_action_message_destination_email_def = TableDef<
  "engine_call_action_message_destination_email",
  {
    crew_identifier: FieldDef<number | null>;
    employee_identifier: FieldDef<number | null>;
    patient_identifier: FieldDef<number | null>;
    location_identifier: FieldDef<number | null>;
    engine_call_action_message_identifier: FieldDef<number>;
    active: FieldDef<boolean>;
    settings_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const engine_call_action_message_destination_email_def: engine_call_action_message_destination_email_def =
  {
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
  };

type engine_call_action_message_destination_employee_table = {
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
type engine_call_action_message_destination_employee_def = TableDef<
  "engine_call_action_message_destination_employee",
  {
    engine_call_action_message_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number | null>;
    location_identifier: FieldDef<number | null>;
    crew_identifier: FieldDef<number | null>;
    active: FieldDef<boolean>;
    settings_email_identifier: FieldDef<number | null>;
    settings_app_identifier: FieldDef<number | null>;
    settings_dect_identifier: FieldDef<number | null>;
    settings_spectralink_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const engine_call_action_message_destination_employee_def: engine_call_action_message_destination_employee_def =
  {
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
  };

type engine_call_action_message_destination_employee_role_table = {
  engine_call_action_message_destination_employee_identifier: number;
  role_identifier: number;
};
type engine_call_action_message_destination_employee_role_def = TableDef<
  "engine_call_action_message_destination_employee_role",
  {
    engine_call_action_message_destination_employee_identifier: FieldDef<number>;
    role_identifier: FieldDef<number>;
  }
>;
const engine_call_action_message_destination_employee_role_def: engine_call_action_message_destination_employee_role_def =
  {
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
  };

type engine_call_action_message_destination_spectralink_table = {
  spectralink_group: string | null;
  engine_call_action_message_identifier: number;
  location_identifier: number | null;
  spectralink_account_identifier: number | null;
  settings_identifier: number | null;
  identifier: number;
};
type engine_call_action_message_destination_spectralink_def = TableDef<
  "engine_call_action_message_destination_spectralink",
  {
    spectralink_group: FieldDef<string | null>;
    engine_call_action_message_identifier: FieldDef<number>;
    location_identifier: FieldDef<number | null>;
    spectralink_account_identifier: FieldDef<number | null>;
    settings_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const engine_call_action_message_destination_spectralink_def: engine_call_action_message_destination_spectralink_def =
  {
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
  };

type engine_call_action_message_email_table = {
  title: string;
  identifier: number;
};
type engine_call_action_message_email_def = TableDef<
  "engine_call_action_message_email",
  {
    title: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const engine_call_action_message_email_def: engine_call_action_message_email_def =
  {
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
  };

type engine_call_action_message_spectralink_table = {
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
type engine_call_action_message_spectralink_def = TableDef<
  "engine_call_action_message_spectralink",
  {
    action: FieldDef<string | null>;
    response: FieldDef<string | null>;
    repeat: FieldDef<string | null>;
    led: FieldDef<string | null>;
    icon: FieldDef<string | null>;
    color: FieldDef<string | null>;
    setup: FieldDef<string | null>;
    alerttone: FieldDef<string | null>;
    alertpattern: FieldDef<string | null>;
    alertvolume: FieldDef<string | null>;
    alerttimeout: FieldDef<string | null>;
    displaytimeout: FieldDef<string | null>;
    callback: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const engine_call_action_message_spectralink_def: engine_call_action_message_spectralink_def =
  {
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
  };

type engine_call_action_viewpoint_notification_table = {
  text: string;
  location_identifier: number;
  status_identifier: number;
  notification_identifier: number | null;
  identifier: number;
};
type engine_call_action_viewpoint_notification_def = TableDef<
  "engine_call_action_viewpoint_notification",
  {
    text: FieldDef<string>;
    location_identifier: FieldDef<number>;
    status_identifier: FieldDef<number>;
    notification_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const engine_call_action_viewpoint_notification_def: engine_call_action_viewpoint_notification_def =
  {
    __meta: {
      name: "engine_call_action_viewpoint_notification",
      schema: "public",
    },
    fields: {
      text: { name: "text", type: { kind: "scalar", name: { name: "text" } } },
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
  };

type engine_call_action_viewpoint_status_table = {
  cause_identifier: number | null;
  location_identifier: number;
  status_identifier: number;
  identifier: number;
};
type engine_call_action_viewpoint_status_def = TableDef<
  "engine_call_action_viewpoint_status",
  {
    cause_identifier: FieldDef<number | null>;
    location_identifier: FieldDef<number>;
    status_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const engine_call_action_viewpoint_status_def: engine_call_action_viewpoint_status_def =
  {
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
  };

type engine_device_configuration_profile_table = {
  name: string;
  crc: number;
  configuration: string;
  identifier: number;
};
type engine_device_configuration_profile_def = TableDef<
  "engine_device_configuration_profile",
  {
    name: FieldDef<string>;
    crc: FieldDef<number>;
    configuration: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const engine_device_configuration_profile_def: engine_device_configuration_profile_def =
  {
    __meta: {
      name: "engine_device_configuration_profile",
      schema: "public",
    },
    fields: {
      name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
      crc: { name: "crc", type: { kind: "scalar", name: { name: "integer" } } },
      configuration: {
        name: "configuration",
        type: { kind: "scalar", name: { name: "text" } },
      },
      identifier: {
        name: "identifier",
        type: { kind: "scalar", name: { name: "integer" } },
      },
    },
  };

type engine_event_table = {
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
type engine_event_def = TableDef<
  "engine_event",
  {
    timestamp: FieldDef<joda.Instant>;
    badge_provided_identifier: FieldDef<number | null>;
    badge_provisioned_identifier: FieldDef<number | null>;
    rf_module_provided_identifier: FieldDef<number | null>;
    access_entered_identifier: FieldDef<number | null>;
    access_left_identifier: FieldDef<number | null>;
    access_denied_identifier: FieldDef<number | null>;
    viewpoint_state_changed_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const engine_event_def: engine_event_def = {
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
};

type engine_event_access_denied_table = {
  session_identifier: number | null;
  identifier: number;
};
type engine_event_access_denied_def = TableDef<
  "engine_event_access_denied",
  {
    session_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const engine_event_access_denied_def: engine_event_access_denied_def = {
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
};

type engine_event_access_entered_table = {
  session_identifier: number;
  identifier: number;
};
type engine_event_access_entered_def = TableDef<
  "engine_event_access_entered",
  {
    session_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const engine_event_access_entered_def: engine_event_access_entered_def = {
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
};

type engine_event_access_left_table = {
  session_identifier: number;
  identifier: number;
};
type engine_event_access_left_def = TableDef<
  "engine_event_access_left",
  {
    session_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const engine_event_access_left_def: engine_event_access_left_def = {
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
};

type engine_event_badge_provided_table = {
  device_identifier: number;
  badge_identifier: number;
  identifier: number;
};
type engine_event_badge_provided_def = TableDef<
  "engine_event_badge_provided",
  {
    device_identifier: FieldDef<number>;
    badge_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const engine_event_badge_provided_def: engine_event_badge_provided_def = {
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
};

type engine_event_badge_provisioned_table = {
  employee_identifier: number;
  patient_identifier: number;
  badge_identifier: number;
  identifier: number;
};
type engine_event_badge_provisioned_def = TableDef<
  "engine_event_badge_provisioned",
  {
    employee_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
    badge_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const engine_event_badge_provisioned_def: engine_event_badge_provisioned_def = {
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
};

type engine_event_rf_module_provided_table = {
  device_identifier: number;
  rf_module_identifier: number;
  identifier: number;
};
type engine_event_rf_module_provided_def = TableDef<
  "engine_event_rf_module_provided",
  {
    device_identifier: FieldDef<number>;
    rf_module_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const engine_event_rf_module_provided_def: engine_event_rf_module_provided_def =
  {
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
  };

type engine_event_viewpoint_state_changed_table = {
  location_identifier: number;
  identifier: number;
};
type engine_event_viewpoint_state_changed_def = TableDef<
  "engine_event_viewpoint_state_changed",
  {
    location_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const engine_event_viewpoint_state_changed_def: engine_event_viewpoint_state_changed_def =
  {
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
  };

type engine_server_configuration_profile_table = {
  name: string;
  configuration: string;
  active: boolean;
  identifier: number;
};
type engine_server_configuration_profile_def = TableDef<
  "engine_server_configuration_profile",
  {
    name: FieldDef<string>;
    configuration: FieldDef<string>;
    active: FieldDef<boolean>;
    identifier: FieldDef<number>;
  }
>;
const engine_server_configuration_profile_def: engine_server_configuration_profile_def =
  {
    __meta: {
      name: "engine_server_configuration_profile",
      schema: "public",
    },
    fields: {
      name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
  };

type espa_in_message_table = {
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
type espa_in_message_def = TableDef<
  "espa_in_message",
  {
    timestamp_requested: FieldDef<joda.Instant>;
    timestamp_executed: FieldDef<joda.Instant | null>;
    message: FieldDef<string>;
    beep: FieldDef<number>;
    address: FieldDef<string>;
    call_type: FieldDef<number>;
    priority: FieldDef<number>;
    com_port_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const espa_in_message_def: espa_in_message_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    message: {
      name: "message",
      type: { kind: "scalar", name: { name: "text" } },
    },
    beep: { name: "beep", type: { kind: "scalar", name: { name: "integer" } } },
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
};

type fcm_account_table = {
  code: string;
  timestamp_created: joda.Instant;
  timestamp_verified: joda.Instant;
  identifier: number;
};
type fcm_account_def = TableDef<
  "fcm_account",
  {
    code: FieldDef<string>;
    timestamp_created: FieldDef<joda.Instant>;
    timestamp_verified: FieldDef<joda.Instant>;
    identifier: FieldDef<number>;
  }
>;
const fcm_account_def: fcm_account_def = {
  __meta: {
    name: "fcm_account",
    schema: "public",
  },
  fields: {
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
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
};

type flyway_schema_history_table = {
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
type flyway_schema_history_def = TableDef<
  "flyway_schema_history",
  {
    installed_rank: FieldDef<number>;
    version: FieldDef<string | null>;
    description: FieldDef<string>;
    type: FieldDef<string>;
    script: FieldDef<string>;
    checksum: FieldDef<number | null>;
    installed_by: FieldDef<string>;
    installed_on: FieldDef<joda.LocalDateTime>;
    execution_time: FieldDef<number>;
    success: FieldDef<boolean>;
  }
>;
const flyway_schema_history_def: flyway_schema_history_def = {
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
      type: { kind: "scalar", name: { name: "timestamp without time zone" } },
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
};

type general_practitioner_table = {
  rziv: string;
  active: boolean;
  administration_contact_identifier: number;
  identifier: number;
};
type general_practitioner_def = TableDef<
  "general_practitioner",
  {
    rziv: FieldDef<string>;
    active: FieldDef<boolean>;
    administration_contact_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const general_practitioner_def: general_practitioner_def = {
  __meta: {
    name: "general_practitioner",
    schema: "public",
  },
  fields: {
    rziv: { name: "rziv", type: { kind: "scalar", name: { name: "text" } } },
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
};

type gps_signal_table = {
  longitude: number;
  latitude: number;
  description: string;
  created: joda.LocalDateTime;
  trusted_device_identifier: number | null;
  remote_alarm_identifier: number | null;
  address_identifier: number | null;
  identifier: number;
};
type gps_signal_def = TableDef<
  "gps_signal",
  {
    longitude: FieldDef<number>;
    latitude: FieldDef<number>;
    description: FieldDef<string>;
    created: FieldDef<joda.LocalDateTime>;
    trusted_device_identifier: FieldDef<number | null>;
    remote_alarm_identifier: FieldDef<number | null>;
    address_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const gps_signal_def: gps_signal_def = {
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
      type: { kind: "scalar", name: { name: "timestamp without time zone" } },
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
};

type heartbeat_table = {
  mac_address: string | null;
  last_ip_address: string | null;
  utc_timestamp_lastseen: joda.Instant;
  utc_timestamp_lastboot: joda.Instant | null;
  type: heartbeat_type;
  tag: string | null;
  identifier: number;
};
type heartbeat_def = TableDef<
  "heartbeat",
  {
    mac_address: FieldDef<string | null>;
    last_ip_address: FieldDef<string | null>;
    utc_timestamp_lastseen: FieldDef<joda.Instant>;
    utc_timestamp_lastboot: FieldDef<joda.Instant | null>;
    type: FieldDef<heartbeat_type>;
    tag: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const heartbeat_def: heartbeat_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type hulp_call_table = {
  name: string;
  priority: number;
  patient_identifier: number;
  webrtc_account_identifier: number;
  identifier: number;
};
type hulp_call_def = TableDef<
  "hulp_call",
  {
    name: FieldDef<string>;
    priority: FieldDef<number>;
    patient_identifier: FieldDef<number>;
    webrtc_account_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const hulp_call_def: hulp_call_def = {
  __meta: {
    name: "hulp_call",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type image_table = {
  code: string;
  url: string;
  type: string;
  timestamp: joda.Instant;
  identifier: number;
};
type image_def = TableDef<
  "image",
  {
    code: FieldDef<string>;
    url: FieldDef<string>;
    type: FieldDef<string>;
    timestamp: FieldDef<joda.Instant>;
    identifier: FieldDef<number>;
  }
>;
const image_def: image_def = {
  __meta: {
    name: "image",
    schema: "public",
  },
  fields: {
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
    url: { name: "url", type: { kind: "scalar", name: { name: "text" } } },
    type: { name: "type", type: { kind: "scalar", name: { name: "text" } } },
    timestamp: {
      name: "timestamp",
      type: { kind: "scalar", name: { name: "timestamp with time zone" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type lifeline_message_table = {
  identifier: number;
};
type lifeline_message_def = TableDef<
  "lifeline_message",
  {
    identifier: FieldDef<number>;
  }
>;
const lifeline_message_def: lifeline_message_def = {
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
};

type lifeline_message_answer_table = {
  timestamp: joda.Instant;
  lifeline_message_identifier: number;
  patient_identifier: number;
  lifeline_message_button_identifier: number | null;
  identifier: number;
};
type lifeline_message_answer_def = TableDef<
  "lifeline_message_answer",
  {
    timestamp: FieldDef<joda.Instant>;
    lifeline_message_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
    lifeline_message_button_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const lifeline_message_answer_def: lifeline_message_answer_def = {
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
};

type lifeline_message_button_table = {
  text: string;
  color: string;
  lifeline_message_identifier: number;
  identifier: number;
};
type lifeline_message_button_def = TableDef<
  "lifeline_message_button",
  {
    text: FieldDef<string>;
    color: FieldDef<string>;
    lifeline_message_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const lifeline_message_button_def: lifeline_message_button_def = {
  __meta: {
    name: "lifeline_message_button",
    schema: "public",
  },
  fields: {
    text: { name: "text", type: { kind: "scalar", name: { name: "text" } } },
    color: { name: "color", type: { kind: "scalar", name: { name: "text" } } },
    lifeline_message_identifier: {
      name: "lifeline_message_identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type locality_table = {
  rssi: number;
  timestamp: joda.Instant;
  rf_module_identifier: number;
  device_identifier: number;
  identifier: number;
};
type locality_def = TableDef<
  "locality",
  {
    rssi: FieldDef<number>;
    timestamp: FieldDef<joda.Instant>;
    rf_module_identifier: FieldDef<number>;
    device_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const locality_def: locality_def = {
  __meta: {
    name: "locality",
    schema: "public",
  },
  fields: {
    rssi: { name: "rssi", type: { kind: "scalar", name: { name: "integer" } } },
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
};

type location_table = {
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
type location_def = TableDef<
  "location",
  {
    name: FieldDef<string>;
    manual_ack_possible: FieldDef<boolean>;
    timezone: FieldDef<string>;
    department_identifier: FieldDef<number | null>;
    care_identifier: FieldDef<number>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
    serial: FieldDef<number>;
  }
>;
const location_def: location_def = {
  __meta: {
    name: "location",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type location_call_table = {
  location_identifier: number;
  started: joda.Instant;
  ended: joda.Instant | null;
  current_status_identifier: number | null;
  call_reason_category_identifier: number | null;
  call_reason_comments: string | null;
  call_reason_employee_identifier: number | null;
  identifier: number;
};
type location_call_def = TableDef<
  "location_call",
  {
    location_identifier: FieldDef<number>;
    started: FieldDef<joda.Instant>;
    ended: FieldDef<joda.Instant | null>;
    current_status_identifier: FieldDef<number | null>;
    call_reason_category_identifier: FieldDef<number | null>;
    call_reason_comments: FieldDef<string | null>;
    call_reason_employee_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const location_call_def: location_call_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type location_call_callback_table = {
  location_call_identifier: number;
  url: string;
  headers: any | null;
  on_create: boolean;
  on_update: boolean;
  on_close: boolean;
  identifier: number;
};
type location_call_callback_def = TableDef<
  "location_call_callback",
  {
    location_call_identifier: FieldDef<number>;
    url: FieldDef<string>;
    headers: FieldDef<any | null>;
    on_create: FieldDef<boolean>;
    on_update: FieldDef<boolean>;
    on_close: FieldDef<boolean>;
    identifier: FieldDef<number>;
  }
>;
const location_call_callback_def: location_call_callback_def = {
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
};

type location_call_employee_presence_table = {
  location_call_identifier: number;
  employee_identifier: number;
  timestamp_enter: joda.Instant;
  timestamp_leave: joda.Instant | null;
  identifier: number;
};
type location_call_employee_presence_def = TableDef<
  "location_call_employee_presence",
  {
    location_call_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number>;
    timestamp_enter: FieldDef<joda.Instant>;
    timestamp_leave: FieldDef<joda.Instant | null>;
    identifier: FieldDef<number>;
  }
>;
const location_call_employee_presence_def: location_call_employee_presence_def =
  {
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
  };

type location_call_patient_in_location_table = {
  location_call_identifier: number;
  patient_identifier: number;
  identifier: number;
};
type location_call_patient_in_location_def = TableDef<
  "location_call_patient_in_location",
  {
    location_call_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const location_call_patient_in_location_def: location_call_patient_in_location_def =
  {
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
  };

type location_call_state_change_table = {
  location_call_identifier: number;
  status_identifier: number;
  timestamp: joda.Instant;
  source: call_source | null;
  identifier: number;
};
type location_call_state_change_def = TableDef<
  "location_call_state_change",
  {
    location_call_identifier: FieldDef<number>;
    status_identifier: FieldDef<number>;
    timestamp: FieldDef<joda.Instant>;
    source: FieldDef<call_source | null>;
    identifier: FieldDef<number>;
  }
>;
const location_call_state_change_def: location_call_state_change_def = {
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
};

type location_gateway_device_gateway_table = {
  location_identifier: number;
  device_identifier: number;
};
type location_gateway_device_gateway_def = TableDef<
  "location_gateway_device_gateway",
  {
    location_identifier: FieldDef<number>;
    device_identifier: FieldDef<number>;
  }
>;
const location_gateway_device_gateway_def: location_gateway_device_gateway_def =
  {
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
  };

type location_patient_table = {
  location_identifier: number;
  patient_identifier: number;
};
type location_patient_def = TableDef<
  "location_patient",
  {
    location_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
  }
>;
const location_patient_def: location_patient_def = {
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
};

type log_table = {
  timestamp: joda.Instant;
  category: string;
  type: string;
  parameters: string;
  site_identifier: number | null;
  identifier: number;
};
type log_def = TableDef<
  "log",
  {
    timestamp: FieldDef<joda.Instant>;
    category: FieldDef<string>;
    type: FieldDef<string>;
    parameters: FieldDef<string>;
    site_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const log_def: log_def = {
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
    type: { name: "type", type: { kind: "scalar", name: { name: "text" } } },
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
};

type log_care_table = {
  location_identifier: number;
  employee_identifier: number;
  period: unknown;
  identifier: number;
};
type log_care_def = TableDef<
  "log_care",
  {
    location_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number>;
    period: FieldDef<unknown>;
    identifier: FieldDef<number>;
  }
>;
const log_care_def: log_care_def = {
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
};

type log_door_table = {
  access_door_identifier: number;
  employee_identifier: number | null;
  patient_identifier: number | null;
  timestamp: joda.Instant;
  identifier: number;
};
type log_door_def = TableDef<
  "log_door",
  {
    access_door_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number | null>;
    patient_identifier: FieldDef<number | null>;
    timestamp: FieldDef<joda.Instant>;
    identifier: FieldDef<number>;
  }
>;
const log_door_def: log_door_def = {
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
};

type log_duty_table = {
  crew_identifier: number;
  employee_identifier: number;
  role_identifier: number;
  period: unknown;
  identifier: number;
};
type log_duty_def = TableDef<
  "log_duty",
  {
    crew_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number>;
    role_identifier: FieldDef<number>;
    period: FieldDef<unknown>;
    identifier: FieldDef<number>;
  }
>;
const log_duty_def: log_duty_def = {
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
};

type log_employee_dect_account_table = {
  employee_identifier: number;
  dect_account_identifier: number;
  period: unknown;
  identifier: number;
};
type log_employee_dect_account_def = TableDef<
  "log_employee_dect_account",
  {
    employee_identifier: FieldDef<number>;
    dect_account_identifier: FieldDef<number>;
    period: FieldDef<unknown>;
    identifier: FieldDef<number>;
  }
>;
const log_employee_dect_account_def: log_employee_dect_account_def = {
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
};

type log_employee_spectralink_account_table = {
  employee_identifier: number;
  spectralink_account_identifier: number;
  period: unknown;
  identifier: number;
};
type log_employee_spectralink_account_def = TableDef<
  "log_employee_spectralink_account",
  {
    employee_identifier: FieldDef<number>;
    spectralink_account_identifier: FieldDef<number>;
    period: FieldDef<unknown>;
    identifier: FieldDef<number>;
  }
>;
const log_employee_spectralink_account_def: log_employee_spectralink_account_def =
  {
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
  };

type log_engine_context_device_table = {
  tag: string;
  state: string;
  parameters: any;
  entered_at: joda.Instant;
  device_identifier: number;
  identifier: number;
};
type log_engine_context_device_def = TableDef<
  "log_engine_context_device",
  {
    tag: FieldDef<string>;
    state: FieldDef<string>;
    parameters: FieldDef<any>;
    entered_at: FieldDef<joda.Instant>;
    device_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const log_engine_context_device_def: log_engine_context_device_def = {
  __meta: {
    name: "log_engine_context_device",
    schema: "public",
  },
  fields: {
    tag: { name: "tag", type: { kind: "scalar", name: { name: "text" } } },
    state: { name: "state", type: { kind: "scalar", name: { name: "text" } } },
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
};

type log_engine_context_location_table = {
  tag: string;
  state: string;
  parameters: any;
  entered_at: joda.Instant;
  location_identifier: number;
  identifier: number;
};
type log_engine_context_location_def = TableDef<
  "log_engine_context_location",
  {
    tag: FieldDef<string>;
    state: FieldDef<string>;
    parameters: FieldDef<any>;
    entered_at: FieldDef<joda.Instant>;
    location_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const log_engine_context_location_def: log_engine_context_location_def = {
  __meta: {
    name: "log_engine_context_location",
    schema: "public",
  },
  fields: {
    tag: { name: "tag", type: { kind: "scalar", name: { name: "text" } } },
    state: { name: "state", type: { kind: "scalar", name: { name: "text" } } },
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
};

type log_engine_context_patient_table = {
  tag: string;
  state: string;
  parameters: any;
  entered_at: joda.Instant;
  patient_identifier: number;
  identifier: number;
};
type log_engine_context_patient_def = TableDef<
  "log_engine_context_patient",
  {
    tag: FieldDef<string>;
    state: FieldDef<string>;
    parameters: FieldDef<any>;
    entered_at: FieldDef<joda.Instant>;
    patient_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const log_engine_context_patient_def: log_engine_context_patient_def = {
  __meta: {
    name: "log_engine_context_patient",
    schema: "public",
  },
  fields: {
    tag: { name: "tag", type: { kind: "scalar", name: { name: "text" } } },
    state: { name: "state", type: { kind: "scalar", name: { name: "text" } } },
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
};

type log_location_patient_table = {
  location_identifier: number;
  patient_identifier: number;
  period: unknown;
  identifier: number;
};
type log_location_patient_def = TableDef<
  "log_location_patient",
  {
    location_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
    period: FieldDef<unknown>;
    identifier: FieldDef<number>;
  }
>;
const log_location_patient_def: log_location_patient_def = {
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
};

type log_patient_cas_mode_table = {
  patient_identifier: number;
  period: unknown;
  identifier: number;
};
type log_patient_cas_mode_def = TableDef<
  "log_patient_cas_mode",
  {
    patient_identifier: FieldDef<number>;
    period: FieldDef<unknown>;
    identifier: FieldDef<number>;
  }
>;
const log_patient_cas_mode_def: log_patient_cas_mode_def = {
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
};

type log_status_table = {
  location_identifier: number;
  status_identifier: number;
  timestamp: joda.Instant;
  identifier: number;
};
type log_status_def = TableDef<
  "log_status",
  {
    location_identifier: FieldDef<number>;
    status_identifier: FieldDef<number>;
    timestamp: FieldDef<joda.Instant>;
    identifier: FieldDef<number>;
  }
>;
const log_status_def: log_status_def = {
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
};

type management_account_table = {
  email: string;
  flag: number;
  identifier: number;
};
type management_account_def = TableDef<
  "management_account",
  {
    email: FieldDef<string>;
    flag: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const management_account_def: management_account_def = {
  __meta: {
    name: "management_account",
    schema: "public",
  },
  fields: {
    email: { name: "email", type: { kind: "scalar", name: { name: "text" } } },
    flag: { name: "flag", type: { kind: "scalar", name: { name: "integer" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type management_account_management_site_table = {
  management_account_identifier: number;
  management_site_identifier: number;
};
type management_account_management_site_def = TableDef<
  "management_account_management_site",
  {
    management_account_identifier: FieldDef<number>;
    management_site_identifier: FieldDef<number>;
  }
>;
const management_account_management_site_def: management_account_management_site_def =
  {
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
  };

type management_department_table = {
  name: string;
  description: string;
  site_identifier: number;
  identifier: number;
};
type management_department_def = TableDef<
  "management_department",
  {
    name: FieldDef<string>;
    description: FieldDef<string>;
    site_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const management_department_def: management_department_def = {
  __meta: {
    name: "management_department",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type management_device_table = {
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
type management_device_def = TableDef<
  "management_device",
  {
    name: FieldDef<string>;
    serial: FieldDef<number>;
    end_of_line_a: FieldDef<boolean>;
    end_of_line_b: FieldDef<boolean>;
    description: FieldDef<string>;
    type: FieldDef<string>;
    server_identifier: FieldDef<number>;
    room_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const management_device_def: management_device_def = {
  __meta: {
    name: "management_device",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
    type: { name: "type", type: { kind: "scalar", name: { name: "text" } } },
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
};

type management_device_update_table = {
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
type management_device_update_def = TableDef<
  "management_device_update",
  {
    timestamp: FieldDef<joda.Instant>;
    end_of_line_a: FieldDef<boolean>;
    end_of_line_b: FieldDef<boolean>;
    serial: FieldDef<number>;
    account_identifier: FieldDef<number>;
    server_identifier: FieldDef<number>;
    site_identifier: FieldDef<number>;
    device_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const management_device_update_def: management_device_update_def = {
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
};

type management_room_table = {
  name: string;
  description: string;
  department_identifier: number;
  identifier: number;
};
type management_room_def = TableDef<
  "management_room",
  {
    name: FieldDef<string>;
    description: FieldDef<string>;
    department_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const management_room_def: management_room_def = {
  __meta: {
    name: "management_room",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type management_server_table = {
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
type management_server_def = TableDef<
  "management_server",
  {
    server_name: FieldDef<string>;
    server_code: FieldDef<string>;
    server_device_address: FieldDef<string>;
    server_public_address: FieldDef<string>;
    server_private_address: FieldDef<string>;
    endpoint_websocket: FieldDef<string>;
    endpoint_engine: FieldDef<string>;
    endpoint_api: FieldDef<string>;
    description: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const management_server_def: management_server_def = {
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
};

type management_site_table = {
  name: string;
  description: string;
  identifier: number;
};
type management_site_def = TableDef<
  "management_site",
  {
    name: FieldDef<string>;
    description: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const management_site_def: management_site_def = {
  __meta: {
    name: "management_site",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    description: {
      name: "description",
      type: { kind: "scalar", name: { name: "text" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type management_site_management_server_table = {
  management_site_identifier: number;
  management_server_identifier: number;
};
type management_site_management_server_def = TableDef<
  "management_site_management_server",
  {
    management_site_identifier: FieldDef<number>;
    management_server_identifier: FieldDef<number>;
  }
>;
const management_site_management_server_def: management_site_management_server_def =
  {
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
  };

type measurement_bloodpressure_table = {
  upper: number;
  lower: number;
  measurement_signature_identifier: number;
  context_value: bloodpressure_context_value | null;
  identifier: number;
};
type measurement_bloodpressure_def = TableDef<
  "measurement_bloodpressure",
  {
    upper: FieldDef<number>;
    lower: FieldDef<number>;
    measurement_signature_identifier: FieldDef<number>;
    context_value: FieldDef<bloodpressure_context_value | null>;
    identifier: FieldDef<number>;
  }
>;
const measurement_bloodpressure_def: measurement_bloodpressure_def = {
  __meta: {
    name: "measurement_bloodpressure",
    schema: "public",
  },
  fields: {
    upper: { name: "upper", type: { kind: "scalar", name: { name: "real" } } },
    lower: { name: "lower", type: { kind: "scalar", name: { name: "real" } } },
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
};

type measurement_bloodsample_table = {
  value: number;
  measurement_signature_identifier: number;
  kind: bloodsample_kind | null;
  identifier: number;
};
type measurement_bloodsample_def = TableDef<
  "measurement_bloodsample",
  {
    value: FieldDef<number>;
    measurement_signature_identifier: FieldDef<number>;
    kind: FieldDef<bloodsample_kind | null>;
    identifier: FieldDef<number>;
  }
>;
const measurement_bloodsample_def: measurement_bloodsample_def = {
  __meta: {
    name: "measurement_bloodsample",
    schema: "public",
  },
  fields: {
    value: { name: "value", type: { kind: "scalar", name: { name: "real" } } },
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
};

type measurement_glycemia_table = {
  value: number;
  measurement_signature_identifier: number;
  context_value: glycemia_context_value | null;
  identifier: number;
};
type measurement_glycemia_def = TableDef<
  "measurement_glycemia",
  {
    value: FieldDef<number>;
    measurement_signature_identifier: FieldDef<number>;
    context_value: FieldDef<glycemia_context_value | null>;
    identifier: FieldDef<number>;
  }
>;
const measurement_glycemia_def: measurement_glycemia_def = {
  __meta: {
    name: "measurement_glycemia",
    schema: "public",
  },
  fields: {
    value: { name: "value", type: { kind: "scalar", name: { name: "real" } } },
    measurement_signature_identifier: {
      name: "measurement_signature_identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    context_value: {
      name: "context_value",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "glycemia_context_value" } },
      },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type measurement_length_table = {
  value: number;
  measurement_signature_identifier: number;
  identifier: number;
};
type measurement_length_def = TableDef<
  "measurement_length",
  {
    value: FieldDef<number>;
    measurement_signature_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const measurement_length_def: measurement_length_def = {
  __meta: {
    name: "measurement_length",
    schema: "public",
  },
  fields: {
    value: { name: "value", type: { kind: "scalar", name: { name: "real" } } },
    measurement_signature_identifier: {
      name: "measurement_signature_identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type measurement_morsefallscale_table = {
  measurement_signature_identifier: number;
  history_of_falling: boolean;
  secondary_diagnosis: boolean;
  ambulatory_aid: morsefallscale_ambulatoryaid_answer;
  iv_heparin_lock: boolean;
  gait: morsefallscale_gait_answer;
  mental_status: morsefallscale_mentalstatus_answer;
  identifier: number;
};
type measurement_morsefallscale_def = TableDef<
  "measurement_morsefallscale",
  {
    measurement_signature_identifier: FieldDef<number>;
    history_of_falling: FieldDef<boolean>;
    secondary_diagnosis: FieldDef<boolean>;
    ambulatory_aid: FieldDef<morsefallscale_ambulatoryaid_answer>;
    iv_heparin_lock: FieldDef<boolean>;
    gait: FieldDef<morsefallscale_gait_answer>;
    mental_status: FieldDef<morsefallscale_mentalstatus_answer>;
    identifier: FieldDef<number>;
  }
>;
const measurement_morsefallscale_def: measurement_morsefallscale_def = {
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
      type: { kind: "scalar", name: { name: "morsefallscale_gait_answer" } },
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
};

type measurement_oxygensaturation_table = {
  value: number;
  measurement_signature_identifier: number;
  identifier: number;
};
type measurement_oxygensaturation_def = TableDef<
  "measurement_oxygensaturation",
  {
    value: FieldDef<number>;
    measurement_signature_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const measurement_oxygensaturation_def: measurement_oxygensaturation_def = {
  __meta: {
    name: "measurement_oxygensaturation",
    schema: "public",
  },
  fields: {
    value: { name: "value", type: { kind: "scalar", name: { name: "real" } } },
    measurement_signature_identifier: {
      name: "measurement_signature_identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type measurement_pulse_table = {
  value: number;
  measurement_signature_identifier: number;
  context_value: pulse_context_value | null;
  identifier: number;
};
type measurement_pulse_def = TableDef<
  "measurement_pulse",
  {
    value: FieldDef<number>;
    measurement_signature_identifier: FieldDef<number>;
    context_value: FieldDef<pulse_context_value | null>;
    identifier: FieldDef<number>;
  }
>;
const measurement_pulse_def: measurement_pulse_def = {
  __meta: {
    name: "measurement_pulse",
    schema: "public",
  },
  fields: {
    value: { name: "value", type: { kind: "scalar", name: { name: "real" } } },
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
};

type measurement_signature_table = {
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
type measurement_signature_def = TableDef<
  "measurement_signature",
  {
    measurement_type: FieldDef<measurement_type>;
    patient_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number>;
    planned_measurement_identifier: FieldDef<number | null>;
    utc_timestamp: FieldDef<joda.Instant>;
    reason_notdone: FieldDef<string | null>;
    done: FieldDef<boolean>;
    synced_on: FieldDef<joda.Instant | null>;
    identifier: FieldDef<number>;
  }
>;
const measurement_signature_def: measurement_signature_def = {
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
    done: { name: "done", type: { kind: "scalar", name: { name: "boolean" } } },
    synced_on: {
      name: "synced_on",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type measurement_stoolrecord_table = {
  value: number;
  measurement_signature_identifier: number;
  context_value: stoolrecord_context_value | null;
  identifier: number;
};
type measurement_stoolrecord_def = TableDef<
  "measurement_stoolrecord",
  {
    value: FieldDef<number>;
    measurement_signature_identifier: FieldDef<number>;
    context_value: FieldDef<stoolrecord_context_value | null>;
    identifier: FieldDef<number>;
  }
>;
const measurement_stoolrecord_def: measurement_stoolrecord_def = {
  __meta: {
    name: "measurement_stoolrecord",
    schema: "public",
  },
  fields: {
    value: { name: "value", type: { kind: "scalar", name: { name: "real" } } },
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
};

type measurement_temperature_table = {
  value: number;
  measurement_signature_identifier: number;
  identifier: number;
};
type measurement_temperature_def = TableDef<
  "measurement_temperature",
  {
    value: FieldDef<number>;
    measurement_signature_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const measurement_temperature_def: measurement_temperature_def = {
  __meta: {
    name: "measurement_temperature",
    schema: "public",
  },
  fields: {
    value: { name: "value", type: { kind: "scalar", name: { name: "real" } } },
    measurement_signature_identifier: {
      name: "measurement_signature_identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type measurement_urineoutput_table = {
  value: number;
  measurement_signature_identifier: number;
  context_value: urineoutput_context_value | null;
  identifier: number;
};
type measurement_urineoutput_def = TableDef<
  "measurement_urineoutput",
  {
    value: FieldDef<number>;
    measurement_signature_identifier: FieldDef<number>;
    context_value: FieldDef<urineoutput_context_value | null>;
    identifier: FieldDef<number>;
  }
>;
const measurement_urineoutput_def: measurement_urineoutput_def = {
  __meta: {
    name: "measurement_urineoutput",
    schema: "public",
  },
  fields: {
    value: { name: "value", type: { kind: "scalar", name: { name: "real" } } },
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
};

type measurement_visualpainscale_table = {
  value: number;
  measurement_signature_identifier: number;
  identifier: number;
};
type measurement_visualpainscale_def = TableDef<
  "measurement_visualpainscale",
  {
    value: FieldDef<number>;
    measurement_signature_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const measurement_visualpainscale_def: measurement_visualpainscale_def = {
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
};

type measurement_waterlowscale_table = {
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
type measurement_waterlowscale_def = TableDef<
  "measurement_waterlowscale",
  {
    measurement_signature_identifier: FieldDef<number>;
    build_height: FieldDef<waterlowscale_build_height_answer>;
    skintype: FieldDef<waterlowscale_skintype_answer[]>;
    gender: FieldDef<waterlowscale_gender_answer>;
    agerange: FieldDef<waterlowscale_agerange_answer>;
    specialrisks: FieldDef<waterlowscale_specialrisks_answer[]>;
    continence: FieldDef<waterlowscale_continence_answer[]>;
    mobility: FieldDef<waterlowscale_mobility_answer[]>;
    apetite: FieldDef<waterlowscale_apetite_answer>;
    neurological_disorders: FieldDef<
      waterlowscale_neurological_disorders_answer[]
    >;
    extensive_surgery: FieldDef<waterlowscale_extensive_surgery_answer[]>;
    medications: FieldDef<waterlowscale_medications_answer[]>;
    identifier: FieldDef<number>;
  }
>;
const measurement_waterlowscale_def: measurement_waterlowscale_def = {
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
      type: { kind: "scalar", name: { name: "waterlowscale_gender_answer" } },
    },
    agerange: {
      name: "agerange",
      type: { kind: "scalar", name: { name: "waterlowscale_agerange_answer" } },
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
      type: { kind: "scalar", name: { name: "waterlowscale_apetite_answer" } },
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
};

type measurement_weight_table = {
  value: number;
  measurement_signature_identifier: number;
  identifier: number;
};
type measurement_weight_def = TableDef<
  "measurement_weight",
  {
    value: FieldDef<number>;
    measurement_signature_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const measurement_weight_def: measurement_weight_def = {
  __meta: {
    name: "measurement_weight",
    schema: "public",
  },
  fields: {
    value: { name: "value", type: { kind: "scalar", name: { name: "real" } } },
    measurement_signature_identifier: {
      name: "measurement_signature_identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type medication_table = {
  code: string;
  name: string;
  description: string;
  medication_form_identifier: number;
  identifier: number;
};
type medication_def = TableDef<
  "medication",
  {
    code: FieldDef<string>;
    name: FieldDef<string>;
    description: FieldDef<string>;
    medication_form_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const medication_def: medication_def = {
  __meta: {
    name: "medication",
    schema: "public",
  },
  fields: {
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type medication_form_table = {
  name: string;
  identifier: number;
};
type medication_form_def = TableDef<
  "medication_form",
  {
    name: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const medication_form_def: medication_form_def = {
  __meta: {
    name: "medication_form",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type medication_signature_table = {
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
type medication_signature_def = TableDef<
  "medication_signature",
  {
    utc_timestamp: FieldDef<joda.Instant>;
    employee_identifier: FieldDef<number>;
    planned_medication_identifier: FieldDef<number>;
    done: FieldDef<boolean>;
    reason_notdone: FieldDef<string | null>;
    phase: FieldDef<medication_phase>;
    patient_identifier: FieldDef<number>;
    synced_on: FieldDef<joda.Instant | null>;
    identifier: FieldDef<number>;
  }
>;
const medication_signature_def: medication_signature_def = {
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
    done: { name: "done", type: { kind: "scalar", name: { name: "boolean" } } },
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type medication_signature_detail_table = {
  medication_signature_identifier: number;
  medication_type_identifier: number;
  dosage: number;
  identifier: number;
};
type medication_signature_detail_def = TableDef<
  "medication_signature_detail",
  {
    medication_signature_identifier: FieldDef<number>;
    medication_type_identifier: FieldDef<number>;
    dosage: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const medication_signature_detail_def: medication_signature_detail_def = {
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
};

type medication_type_table = {
  grouping: string | null;
  name: string;
  unit: string;
  code: string | null;
  identifier: number;
};
type medication_type_def = TableDef<
  "medication_type",
  {
    grouping: FieldDef<string | null>;
    name: FieldDef<string>;
    unit: FieldDef<string>;
    code: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const medication_type_def: medication_type_def = {
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
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    unit: { name: "unit", type: { kind: "scalar", name: { name: "text" } } },
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
};

type message_table = {
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
type message_def = TableDef<
  "message",
  {
    type: FieldDef<number>;
    message: FieldDef<string>;
    timestamp: FieldDef<joda.Instant>;
    from_name: FieldDef<string | null>;
    from_patient_identifier: FieldDef<number | null>;
    from_employee_identifier: FieldDef<number | null>;
    about_patient_identifier: FieldDef<number | null>;
    lifeline_message_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const message_def: message_def = {
  __meta: {
    name: "message",
    schema: "public",
  },
  fields: {
    type: { name: "type", type: { kind: "scalar", name: { name: "integer" } } },
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
};

type message_images_table = {
  message_identifier: number;
  image_identifier: number;
};
type message_images_def = TableDef<
  "message_images",
  {
    message_identifier: FieldDef<number>;
    image_identifier: FieldDef<number>;
  }
>;
const message_images_def: message_images_def = {
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
};

type message_read_employees_table = {
  message_identifier: number;
  employee_identifier: number;
};
type message_read_employees_def = TableDef<
  "message_read_employees",
  {
    message_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number>;
  }
>;
const message_read_employees_def: message_read_employees_def = {
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
};

type message_read_patients_table = {
  message_identifier: number;
  patient_identifier: number;
};
type message_read_patients_def = TableDef<
  "message_read_patients",
  {
    message_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
  }
>;
const message_read_patients_def: message_read_patients_def = {
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
};

type message_to_patients_table = {
  message_identifier: number;
  patient_identifier: number;
};
type message_to_patients_def = TableDef<
  "message_to_patients",
  {
    message_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
  }
>;
const message_to_patients_def: message_to_patients_def = {
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
};

type message_to_roles_table = {
  message_identifier: number;
  role_identifier: number;
};
type message_to_roles_def = TableDef<
  "message_to_roles",
  {
    message_identifier: FieldDef<number>;
    role_identifier: FieldDef<number>;
  }
>;
const message_to_roles_def: message_to_roles_def = {
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
};

type mis_connection_table = {
  name: string;
  type: string;
  definition: any;
  populated_at: joda.Instant | null;
  identifier: number;
};
type mis_connection_def = TableDef<
  "mis_connection",
  {
    name: FieldDef<string>;
    type: FieldDef<string>;
    definition: FieldDef<any>;
    populated_at: FieldDef<joda.Instant | null>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_def: mis_connection_def = {
  __meta: {
    name: "mis_connection",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    type: { name: "type", type: { kind: "scalar", name: { name: "text" } } },
    definition: {
      name: "definition",
      type: { kind: "scalar", name: { name: "jsonb" } },
    },
    populated_at: {
      name: "populated_at",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type mis_connection_care_action_table = {
  mis_connection_identifier: number;
  care_action_identifier: number;
  external_identifier: string;
  identifier: number;
};
type mis_connection_care_action_def = TableDef<
  "mis_connection_care_action",
  {
    mis_connection_identifier: FieldDef<number>;
    care_action_identifier: FieldDef<number>;
    external_identifier: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_care_action_def: mis_connection_care_action_def = {
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
};

type mis_connection_care_action_signature_table = {
  mis_connection_identifier: number;
  care_action_signature_identifier: number;
  external_identifier: string;
  identifier: number;
};
type mis_connection_care_action_signature_def = TableDef<
  "mis_connection_care_action_signature",
  {
    mis_connection_identifier: FieldDef<number>;
    care_action_signature_identifier: FieldDef<number>;
    external_identifier: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_care_action_signature_def: mis_connection_care_action_signature_def =
  {
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
  };

type mis_connection_department_table = {
  mis_connection_identifier: number;
  department_identifier: number;
  identification: any;
  data: any | null;
  mis_mode: mis_mode;
  cas_version: number;
  identifier: number;
};
type mis_connection_department_def = TableDef<
  "mis_connection_department",
  {
    mis_connection_identifier: FieldDef<number>;
    department_identifier: FieldDef<number>;
    identification: FieldDef<any>;
    data: FieldDef<any | null>;
    mis_mode: FieldDef<mis_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_department_def: mis_connection_department_def = {
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
};

type mis_connection_diary_table = {
  mis_connection_identifier: number;
  diary_identifier: number;
  external_identifier: string;
  identifier: number;
};
type mis_connection_diary_def = TableDef<
  "mis_connection_diary",
  {
    mis_connection_identifier: FieldDef<number>;
    diary_identifier: FieldDef<number>;
    external_identifier: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_diary_def: mis_connection_diary_def = {
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
};

type mis_connection_employee_table = {
  mis_connection_identifier: number;
  employee_identifier: number;
  identification: any;
  data: any | null;
  mis_mode: mis_mode;
  cas_version: number;
  identifier: number;
};
type mis_connection_employee_def = TableDef<
  "mis_connection_employee",
  {
    mis_connection_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number>;
    identification: FieldDef<any>;
    data: FieldDef<any | null>;
    mis_mode: FieldDef<mis_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_employee_def: mis_connection_employee_def = {
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
};

type mis_connection_location_table = {
  mis_connection_identifier: number;
  location_identifier: number;
  identification: any;
  data: any | null;
  mis_mode: mis_mode;
  cas_version: number;
  identifier: number;
};
type mis_connection_location_def = TableDef<
  "mis_connection_location",
  {
    mis_connection_identifier: FieldDef<number>;
    location_identifier: FieldDef<number>;
    identification: FieldDef<any>;
    data: FieldDef<any | null>;
    mis_mode: FieldDef<mis_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_location_def: mis_connection_location_def = {
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
};

type mis_connection_measurement_signature_table = {
  mis_connection_identifier: number;
  measurement_signature_identifier: number;
  external_identifier: string;
  identifier: number;
};
type mis_connection_measurement_signature_def = TableDef<
  "mis_connection_measurement_signature",
  {
    mis_connection_identifier: FieldDef<number>;
    measurement_signature_identifier: FieldDef<number>;
    external_identifier: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_measurement_signature_def: mis_connection_measurement_signature_def =
  {
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
  };

type mis_connection_medication_signature_table = {
  mis_connection_identifier: number;
  medication_signature_identifier: number;
  external_identifier: string;
  identifier: number;
};
type mis_connection_medication_signature_def = TableDef<
  "mis_connection_medication_signature",
  {
    mis_connection_identifier: FieldDef<number>;
    medication_signature_identifier: FieldDef<number>;
    external_identifier: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_medication_signature_def: mis_connection_medication_signature_def =
  {
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
  };

type mis_connection_medication_type_table = {
  mis_connection_identifier: number;
  medication_type_identifier: number;
  external_identifier: string;
  identifier: number;
};
type mis_connection_medication_type_def = TableDef<
  "mis_connection_medication_type",
  {
    mis_connection_identifier: FieldDef<number>;
    medication_type_identifier: FieldDef<number>;
    external_identifier: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_medication_type_def: mis_connection_medication_type_def = {
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
};

type mis_connection_patient_table = {
  mis_connection_identifier: number;
  patient_identifier: number;
  identification: any;
  data: any | null;
  mis_mode: mis_mode;
  cas_version: number;
  identifier: number;
};
type mis_connection_patient_def = TableDef<
  "mis_connection_patient",
  {
    mis_connection_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
    identification: FieldDef<any>;
    data: FieldDef<any | null>;
    mis_mode: FieldDef<mis_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_patient_def: mis_connection_patient_def = {
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
};

type mis_connection_planned_care_action_table = {
  planned_care_action_identifier: number;
  external_identifier: string;
  mis_connection_identifier: number;
  identifier: number;
};
type mis_connection_planned_care_action_def = TableDef<
  "mis_connection_planned_care_action",
  {
    planned_care_action_identifier: FieldDef<number>;
    external_identifier: FieldDef<string>;
    mis_connection_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_planned_care_action_def: mis_connection_planned_care_action_def =
  {
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
  };

type mis_connection_planned_measurement_table = {
  mis_connection_identifier: number;
  planned_measurement_identifier: number;
  external_identifier: string;
  identifier: number;
};
type mis_connection_planned_measurement_def = TableDef<
  "mis_connection_planned_measurement",
  {
    mis_connection_identifier: FieldDef<number>;
    planned_measurement_identifier: FieldDef<number>;
    external_identifier: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_planned_measurement_def: mis_connection_planned_measurement_def =
  {
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
  };

type mis_connection_planned_medication_table = {
  mis_connection_identifier: number;
  planned_medication_identifier: number;
  external_identifier: string;
  identifier: number;
};
type mis_connection_planned_medication_def = TableDef<
  "mis_connection_planned_medication",
  {
    mis_connection_identifier: FieldDef<number>;
    planned_medication_identifier: FieldDef<number>;
    external_identifier: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_planned_medication_def: mis_connection_planned_medication_def =
  {
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
  };

type mis_connection_section_table = {
  mis_connection_identifier: number;
  section_identifier: number;
  identification: any;
  data: any | null;
  mis_mode: mis_mode;
  cas_version: number;
  identifier: number;
};
type mis_connection_section_def = TableDef<
  "mis_connection_section",
  {
    mis_connection_identifier: FieldDef<number>;
    section_identifier: FieldDef<number>;
    identification: FieldDef<any>;
    data: FieldDef<any | null>;
    mis_mode: FieldDef<mis_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_section_def: mis_connection_section_def = {
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
};

type mis_connection_site_table = {
  mis_connection_identifier: number;
  site_identifier: number;
  identification: any;
  data: any | null;
  mis_mode: mis_mode;
  cas_version: number;
  identifier: number;
};
type mis_connection_site_def = TableDef<
  "mis_connection_site",
  {
    mis_connection_identifier: FieldDef<number>;
    site_identifier: FieldDef<number>;
    identification: FieldDef<any>;
    data: FieldDef<any | null>;
    mis_mode: FieldDef<mis_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const mis_connection_site_def: mis_connection_site_def = {
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
};

type monitor_status_device_table = {
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
type monitor_status_device_def = TableDef<
  "monitor_status_device",
  {
    device_identifier: FieldDef<number>;
    utc_timestamp_lastboot: FieldDef<joda.Instant | null>;
    utc_timestamp_lastboot_ui: FieldDef<joda.Instant | null>;
    utc_timestamp_lastcontact: FieldDef<joda.Instant | null>;
    utc_timestamp_lastcontact_ui: FieldDef<joda.Instant | null>;
    utc_timestamp_lastupdate: FieldDef<joda.Instant | null>;
    processing_rmq_status: FieldDef<monitor_rmq_status | null>;
    overheat_status: FieldDef<monitor_heat_status | null>;
    voice_status: FieldDef<monitor_voice_status | null>;
    last_known_ip: FieldDef<string | null>;
    last_known_ui_ip: FieldDef<string | null>;
    mac_address: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const monitor_status_device_def: monitor_status_device_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    utc_timestamp_lastboot_ui: {
      name: "utc_timestamp_lastboot_ui",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    utc_timestamp_lastcontact: {
      name: "utc_timestamp_lastcontact",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    utc_timestamp_lastcontact_ui: {
      name: "utc_timestamp_lastcontact_ui",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    utc_timestamp_lastupdate: {
      name: "utc_timestamp_lastupdate",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type monitor_status_server_table = {
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
type monitor_status_server_def = TableDef<
  "monitor_status_server",
  {
    host_name: FieldDef<string>;
    last_known_ip: FieldDef<string | null>;
    utc_timestamp_lastboot: FieldDef<joda.Instant | null>;
    utc_timestamp_lastcontact: FieldDef<joda.Instant | null>;
    utc_timestamp_lastupdate: FieldDef<joda.Instant | null>;
    disk_space_gb_free: FieldDef<number | null>;
    disk_space_percent_used: FieldDef<number | null>;
    cpu_percent: FieldDef<number | null>;
    mem_gb_free: FieldDef<number | null>;
    mem_percent_used: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const monitor_status_server_def: monitor_status_server_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    utc_timestamp_lastcontact: {
      name: "utc_timestamp_lastcontact",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    utc_timestamp_lastupdate: {
      name: "utc_timestamp_lastupdate",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type notification_table = {
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
type notification_def = TableDef<
  "notification",
  {
    message: FieldDef<string>;
    timestamp: FieldDef<joda.Instant>;
    state: FieldDef<number>;
    location_identifier: FieldDef<number>;
    status_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number | null>;
    tag: FieldDef<string | null>;
    acknowledged_at: FieldDef<joda.Instant | null>;
    deleted_at: FieldDef<joda.Instant | null>;
    identifier: FieldDef<number>;
  }
>;
const notification_def: notification_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    deleted_at: {
      name: "deleted_at",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type organization_table = {
  type: number;
  name: string;
  administration_contact_identifier: number;
  identifier: number;
};
type organization_def = TableDef<
  "organization",
  {
    type: FieldDef<number>;
    name: FieldDef<string>;
    administration_contact_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const organization_def: organization_def = {
  __meta: {
    name: "organization",
    schema: "public",
  },
  fields: {
    type: { name: "type", type: { kind: "scalar", name: { name: "integer" } } },
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    administration_contact_identifier: {
      name: "administration_contact_identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type patient_table = {
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
type patient_def = TableDef<
  "patient",
  {
    name: FieldDef<string>;
    first_name: FieldDef<string>;
    last_name: FieldDef<string>;
    sex: FieldDef<string>;
    code: FieldDef<string>;
    avatar: FieldDef<string | null>;
    status: FieldDef<number>;
    patient_administration_information_identifier: FieldDef<number | null>;
    patient_social_information_identifier: FieldDef<number | null>;
    patient_medical_information_identifier: FieldDef<number | null>;
    section_identifier: FieldDef<number | null>;
    room_identifier: FieldDef<number | null>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    middle_name: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const patient_def: patient_def = {
  __meta: {
    name: "patient",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    first_name: {
      name: "first_name",
      type: { kind: "scalar", name: { name: "text" } },
    },
    last_name: {
      name: "last_name",
      type: { kind: "scalar", name: { name: "text" } },
    },
    sex: { name: "sex", type: { kind: "scalar", name: { name: "text" } } },
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
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
};

type patient_administration_information_table = {
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
type patient_administration_information_def = TableDef<
  "patient_administration_information",
  {
    nickname: FieldDef<string | null>;
    birthdate: FieldDef<joda.LocalDate | null>;
    birthplace: FieldDef<string | null>;
    marital_status: FieldDef<string | null>;
    nationality: FieldDef<string | null>;
    national_insurance_number: FieldDef<string | null>;
    identity_card_number: FieldDef<string | null>;
    bank_account: FieldDef<string | null>;
    membership_number: FieldDef<string | null>;
    start_hospitalization: FieldDef<joda.LocalDate | null>;
    end_hospitalization: FieldDef<joda.LocalDate | null>;
    religion: FieldDef<string | null>;
    remarks: FieldDef<string | null>;
    health_insurance_identifier: FieldDef<number | null>;
    preferably_hospital_identifier: FieldDef<number | null>;
    domicile_identifier: FieldDef<number | null>;
    doctor_name: FieldDef<string | null>;
    doctor_phone: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const patient_administration_information_def: patient_administration_information_def =
  {
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
  };

type patient_contact_table = {
  priority: number;
  function: string | null;
  relation: string | null;
  patient_administration_information_identifier: number;
  administration_contact_identifier: number;
  identifier: number;
};
type patient_contact_def = TableDef<
  "patient_contact",
  {
    priority: FieldDef<number>;
    function: FieldDef<string | null>;
    relation: FieldDef<string | null>;
    patient_administration_information_identifier: FieldDef<number>;
    administration_contact_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const patient_contact_def: patient_contact_def = {
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
};

type patient_group_table = {
  code: string;
  identifier: number;
};
type patient_group_def = TableDef<
  "patient_group",
  {
    code: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const patient_group_def: patient_group_def = {
  __meta: {
    name: "patient_group",
    schema: "public",
  },
  fields: {
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type patient_group_ui_access_table = {
  patient_group_identifier: number;
  ui_access_identifier: number;
};
type patient_group_ui_access_def = TableDef<
  "patient_group_ui_access",
  {
    patient_group_identifier: FieldDef<number>;
    ui_access_identifier: FieldDef<number>;
  }
>;
const patient_group_ui_access_def: patient_group_ui_access_def = {
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
};

type patient_identification_table = {
  key: string;
  value: string;
  patient_identifier: number;
  cas_version: number;
  identifier: number;
};
type patient_identification_def = TableDef<
  "patient_identification",
  {
    key: FieldDef<string>;
    value: FieldDef<string>;
    patient_identifier: FieldDef<number>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const patient_identification_def: patient_identification_def = {
  __meta: {
    name: "patient_identification",
    schema: "public",
  },
  fields: {
    key: { name: "key", type: { kind: "scalar", name: { name: "text" } } },
    value: { name: "value", type: { kind: "scalar", name: { name: "text" } } },
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
};

type patient_info_table = {
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
type patient_info_def = TableDef<
  "patient_info",
  {
    patient_identifier: FieldDef<number>;
    nickname: FieldDef<string | null>;
    birthdate: FieldDef<joda.LocalDate | null>;
    birthplace: FieldDef<string | null>;
    admission_date: FieldDef<joda.Instant | null>;
    depart_date: FieldDef<joda.Instant | null>;
    decease_date: FieldDef<joda.Instant | null>;
    doctor_name: FieldDef<string | null>;
    doctor_phone: FieldDef<string | null>;
    general_remarks: FieldDef<string | null>;
    medical_remarks: FieldDef<string | null>;
    blood_type: FieldDef<t_blood_type | null>;
    diet: FieldDef<string | null>;
    nat_number: FieldDef<string | null>;
    healthservice_number: FieldDef<string | null>;
    katz_score: FieldDef<string | null>;
    is_diabetic: FieldDef<boolean | null>;
    is_epileptic: FieldDef<boolean | null>;
    is_palliative: FieldDef<boolean | null>;
    has_angor: FieldDef<boolean | null>;
    has_pacemaker: FieldDef<boolean | null>;
    has_coagulationdisorder: FieldDef<boolean | null>;
    has_copd: FieldDef<boolean | null>;
    dementia_stage: FieldDef<dementia_stage | null>;
    food_allergies: FieldDef<string | null>;
    medicine_allergies: FieldDef<string | null>;
    other_allergies: FieldDef<string | null>;
    dnr: FieldDef<boolean | null>;
    dnrdescription: FieldDef<string | null>;
    constraints: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const patient_info_def: patient_info_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    depart_date: {
      name: "depart_date",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    decease_date: {
      name: "decease_date",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type patient_lifeline_message_pending_table = {
  patient_identifier: number;
  lifeline_message_identifier: number;
};
type patient_lifeline_message_pending_def = TableDef<
  "patient_lifeline_message_pending",
  {
    patient_identifier: FieldDef<number>;
    lifeline_message_identifier: FieldDef<number>;
  }
>;
const patient_lifeline_message_pending_def: patient_lifeline_message_pending_def =
  {
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
  };

type patient_medical_information_table = {
  diet: string | null;
  general: string | null;
  general_practitioner_identifier: number | null;
  blood_type_identifier: number | null;
  dementia_identifier: number | null;
  blood_type: t_blood_type | null;
  identifier: number;
};
type patient_medical_information_def = TableDef<
  "patient_medical_information",
  {
    diet: FieldDef<string | null>;
    general: FieldDef<string | null>;
    general_practitioner_identifier: FieldDef<number | null>;
    blood_type_identifier: FieldDef<number | null>;
    dementia_identifier: FieldDef<number | null>;
    blood_type: FieldDef<t_blood_type | null>;
    identifier: FieldDef<number>;
  }
>;
const patient_medical_information_def: patient_medical_information_def = {
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
};

type patient_medical_information_allergies_table = {
  patient_medical_information_identifier: number;
  allergy_identifier: number;
};
type patient_medical_information_allergies_def = TableDef<
  "patient_medical_information_allergies",
  {
    patient_medical_information_identifier: FieldDef<number>;
    allergy_identifier: FieldDef<number>;
  }
>;
const patient_medical_information_allergies_def: patient_medical_information_allergies_def =
  {
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
  };

type patient_patient_group_table = {
  patient_identifier: number;
  patient_group_identifier: number;
};
type patient_patient_group_def = TableDef<
  "patient_patient_group",
  {
    patient_identifier: FieldDef<number>;
    patient_group_identifier: FieldDef<number>;
  }
>;
const patient_patient_group_def: patient_patient_group_def = {
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
};

type patient_session_table = {
  tasks_performed: boolean;
  timestamp_enter: joda.Instant;
  timestamp_leave: joda.Instant | null;
  care_session_identifier: number | null;
  patient_identifier: number;
  identifier: number;
};
type patient_session_def = TableDef<
  "patient_session",
  {
    tasks_performed: FieldDef<boolean>;
    timestamp_enter: FieldDef<joda.Instant>;
    timestamp_leave: FieldDef<joda.Instant | null>;
    care_session_identifier: FieldDef<number | null>;
    patient_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const patient_session_def: patient_session_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type patient_social_information_table = {
  instagram_token: string | null;
  general: string | null;
  identifier: number;
};
type patient_social_information_def = TableDef<
  "patient_social_information",
  {
    instagram_token: FieldDef<string | null>;
    general: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const patient_social_information_def: patient_social_information_def = {
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
};

type period_table = {
  name: string;
  start_time: joda.LocalTime;
  end_time: joda.LocalTime;
  identifier: number;
};
type period_def = TableDef<
  "period",
  {
    name: FieldDef<string>;
    start_time: FieldDef<joda.LocalTime>;
    end_time: FieldDef<joda.LocalTime>;
    identifier: FieldDef<number>;
  }
>;
const period_def: period_def = {
  __meta: {
    name: "period",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type picture_table = {
  name: string;
  data: Buffer;
  mimetype: string;
  identifier: number;
};
type picture_def = TableDef<
  "picture",
  {
    name: FieldDef<string>;
    data: FieldDef<Buffer>;
    mimetype: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const picture_def: picture_def = {
  __meta: {
    name: "picture",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    data: { name: "data", type: { kind: "scalar", name: { name: "bytea" } } },
    mimetype: {
      name: "mimetype",
      type: { kind: "scalar", name: { name: "text" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type planned_care_action_table = {
  utc_timestamp: joda.Instant;
  care_action_identifier: number;
  patient_identifier: number;
  remarks: string | null;
  authorization_type: authorization_type;
  identifier: number;
};
type planned_care_action_def = TableDef<
  "planned_care_action",
  {
    utc_timestamp: FieldDef<joda.Instant>;
    care_action_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
    remarks: FieldDef<string | null>;
    authorization_type: FieldDef<authorization_type>;
    identifier: FieldDef<number>;
  }
>;
const planned_care_action_def: planned_care_action_def = {
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
};

type planned_measurement_table = {
  measurement_type: measurement_type;
  patient_identifier: number;
  utc_timestamp: joda.Instant;
  remarks: string | null;
  identifier: number;
};
type planned_measurement_def = TableDef<
  "planned_measurement",
  {
    measurement_type: FieldDef<measurement_type>;
    patient_identifier: FieldDef<number>;
    utc_timestamp: FieldDef<joda.Instant>;
    remarks: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const planned_measurement_def: planned_measurement_def = {
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
};

type planned_medication_table = {
  patient_identifier: number;
  phase: medication_phase;
  remarks: string | null;
  utc_timestamp: joda.Instant;
  identifier: number;
};
type planned_medication_def = TableDef<
  "planned_medication",
  {
    patient_identifier: FieldDef<number>;
    phase: FieldDef<medication_phase>;
    remarks: FieldDef<string | null>;
    utc_timestamp: FieldDef<joda.Instant>;
    identifier: FieldDef<number>;
  }
>;
const planned_medication_def: planned_medication_def = {
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
};

type planned_medication_detail_table = {
  planned_medication_identifier: number;
  medication_type_identifier: number;
  dosage: number;
  identifier: number;
};
type planned_medication_detail_def = TableDef<
  "planned_medication_detail",
  {
    planned_medication_identifier: FieldDef<number>;
    medication_type_identifier: FieldDef<number>;
    dosage: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const planned_medication_detail_def: planned_medication_detail_def = {
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
};

type possible_service_function_table = {
  code: string;
  identifier: number;
};
type possible_service_function_def = TableDef<
  "possible_service_function",
  {
    code: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const possible_service_function_def: possible_service_function_def = {
  __meta: {
    name: "possible_service_function",
    schema: "public",
  },
  fields: {
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type possible_work_order_table = {
  name: string;
  code: string;
  possible_work_order_top_identifier: number;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type possible_work_order_def = TableDef<
  "possible_work_order",
  {
    name: FieldDef<string>;
    code: FieldDef<string>;
    possible_work_order_top_identifier: FieldDef<number>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const possible_work_order_def: possible_work_order_def = {
  __meta: {
    name: "possible_work_order",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
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
};

type possible_work_order_role_table = {
  possible_work_order_identifier: number;
  role_identifier: number;
};
type possible_work_order_role_def = TableDef<
  "possible_work_order_role",
  {
    possible_work_order_identifier: FieldDef<number>;
    role_identifier: FieldDef<number>;
  }
>;
const possible_work_order_role_def: possible_work_order_role_def = {
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
};

type possible_work_order_top_table = {
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type possible_work_order_top_def = TableDef<
  "possible_work_order_top",
  {
    name: FieldDef<string>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const possible_work_order_top_def: possible_work_order_top_def = {
  __meta: {
    name: "possible_work_order_top",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type predefined_broadcast_call_table = {
  name: string;
  sound: string;
  identifier: number;
};
type predefined_broadcast_call_def = TableDef<
  "predefined_broadcast_call",
  {
    name: FieldDef<string>;
    sound: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const predefined_broadcast_call_def: predefined_broadcast_call_def = {
  __meta: {
    name: "predefined_broadcast_call",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    sound: { name: "sound", type: { kind: "scalar", name: { name: "text" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type process_table = {
  name: string;
  site_identifier: number;
  mis_connection_identifier: number | null;
  identifier: number;
};
type process_def = TableDef<
  "process",
  {
    name: FieldDef<string>;
    site_identifier: FieldDef<number>;
    mis_connection_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const process_def: process_def = {
  __meta: {
    name: "process",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type process_boot_cycle_table = {
  version: string;
  build: string;
  timestamp: joda.Instant;
  process_identifier: number | null;
  identifier: number;
};
type process_boot_cycle_def = TableDef<
  "process_boot_cycle",
  {
    version: FieldDef<string>;
    build: FieldDef<string>;
    timestamp: FieldDef<joda.Instant>;
    process_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const process_boot_cycle_def: process_boot_cycle_def = {
  __meta: {
    name: "process_boot_cycle",
    schema: "public",
  },
  fields: {
    version: {
      name: "version",
      type: { kind: "scalar", name: { name: "text" } },
    },
    build: { name: "build", type: { kind: "scalar", name: { name: "text" } } },
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
};

type radio_table = {
  name: string;
  avatar: string;
  stream: string;
  priority: number;
  identifier: number;
};
type radio_def = TableDef<
  "radio",
  {
    name: FieldDef<string>;
    avatar: FieldDef<string>;
    stream: FieldDef<string>;
    priority: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const radio_def: radio_def = {
  __meta: {
    name: "radio",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type remote_alarm_table = {
  created: joda.Instant;
  trusted_device_identifier: number | null;
  sui_status_identifier: number | null;
  patient_identifier: number;
  identifier: number;
};
type remote_alarm_def = TableDef<
  "remote_alarm",
  {
    created: FieldDef<joda.Instant>;
    trusted_device_identifier: FieldDef<number | null>;
    sui_status_identifier: FieldDef<number | null>;
    patient_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const remote_alarm_def: remote_alarm_def = {
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
};

type rf_module_table = {
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
type rf_module_def = TableDef<
  "rf_module",
  {
    serial: FieldDef<number>;
    brand_identifier: FieldDef<number>;
    type_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number | null>;
    location_identifier: FieldDef<number | null>;
    activity_timestamp: FieldDef<joda.Instant | null>;
    activity_data: FieldDef<string | null>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    battery_low: FieldDef<boolean | null>;
    identifier: FieldDef<number>;
  }
>;
const rf_module_def: rf_module_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type rf_module_brand_table = {
  identifier: number;
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
};
type rf_module_brand_def = TableDef<
  "rf_module_brand",
  {
    identifier: FieldDef<number>;
    name: FieldDef<string>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
  }
>;
const rf_module_brand_def: rf_module_brand_def = {
  __meta: {
    name: "rf_module_brand",
    schema: "public",
  },
  fields: {
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    cas_mode: {
      name: "cas_mode",
      type: { kind: "scalar", name: { name: "cas_mode" } },
    },
    cas_version: {
      name: "cas_version",
      type: { kind: "scalar", name: { name: "bigint" } },
    },
  },
};

type rf_module_type_table = {
  identifier: number;
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
};
type rf_module_type_def = TableDef<
  "rf_module_type",
  {
    identifier: FieldDef<number>;
    name: FieldDef<string>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
  }
>;
const rf_module_type_def: rf_module_type_def = {
  __meta: {
    name: "rf_module_type",
    schema: "public",
  },
  fields: {
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    cas_mode: {
      name: "cas_mode",
      type: { kind: "scalar", name: { name: "cas_mode" } },
    },
    cas_version: {
      name: "cas_version",
      type: { kind: "scalar", name: { name: "bigint" } },
    },
  },
};

type role_table = {
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type role_def = TableDef<
  "role",
  {
    name: FieldDef<string>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const role_def: role_def = {
  __meta: {
    name: "role",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type role_status_table = {
  role_identifier: number;
  status_identifier: number;
};
type role_status_def = TableDef<
  "role_status",
  {
    role_identifier: FieldDef<number>;
    status_identifier: FieldDef<number>;
  }
>;
const role_status_def: role_status_def = {
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
};

type role_ui_access_table = {
  role_identifier: number;
  ui_access_identifier: number;
};
type role_ui_access_def = TableDef<
  "role_ui_access",
  {
    role_identifier: FieldDef<number>;
    ui_access_identifier: FieldDef<number>;
  }
>;
const role_ui_access_def: role_ui_access_def = {
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
};

type roles_engine_call_action_message_destination_email_table = {
  role_identifier: number;
  engine_call_action_message_destination_email_identifier: number;
};
type roles_engine_call_action_message_destination_email_def = TableDef<
  "roles_engine_call_action_message_destination_email",
  {
    role_identifier: FieldDef<number>;
    engine_call_action_message_destination_email_identifier: FieldDef<number>;
  }
>;
const roles_engine_call_action_message_destination_email_def: roles_engine_call_action_message_destination_email_def =
  {
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
  };

type room_table = {
  name: string;
  code: string;
  location_identifier: number;
  identifier: number;
};
type room_def = TableDef<
  "room",
  {
    name: FieldDef<string>;
    code: FieldDef<string>;
    location_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const room_def: room_def = {
  __meta: {
    name: "room",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
    location_identifier: {
      name: "location_identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type section_table = {
  name: string;
  code: string;
  identifier: number;
};
type section_def = TableDef<
  "section",
  {
    name: FieldDef<string>;
    code: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const section_def: section_def = {
  __meta: {
    name: "section",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type service_function_table = {
  timestamp_enter: joda.Instant;
  timestamp_leave: joda.Instant | null;
  employee_identifier: number | null;
  possible_service_function_identifier: number | null;
  identifier: number;
};
type service_function_def = TableDef<
  "service_function",
  {
    timestamp_enter: FieldDef<joda.Instant>;
    timestamp_leave: FieldDef<joda.Instant | null>;
    employee_identifier: FieldDef<number | null>;
    possible_service_function_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const service_function_def: service_function_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type setting_table = {
  key: string;
  value: string;
  description: string;
  site_identifier: number | null;
  process_identifier: number | null;
  identifier: number;
};
type setting_def = TableDef<
  "setting",
  {
    key: FieldDef<string>;
    value: FieldDef<string>;
    description: FieldDef<string>;
    site_identifier: FieldDef<number | null>;
    process_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const setting_def: setting_def = {
  __meta: {
    name: "setting",
    schema: "public",
  },
  fields: {
    key: { name: "key", type: { kind: "scalar", name: { name: "text" } } },
    value: { name: "value", type: { kind: "scalar", name: { name: "text" } } },
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
};

type shortcut_table = {
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
type shortcut_def = TableDef<
  "shortcut",
  {
    name: FieldDef<string>;
    icon: FieldDef<string>;
    url: FieldDef<string>;
    type: FieldDef<shortcut_type>;
    position: FieldDef<number>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    picture_identifier: FieldDef<number | null>;
    patient_can_view: FieldDef<boolean>;
    identifier: FieldDef<number>;
  }
>;
const shortcut_def: shortcut_def = {
  __meta: {
    name: "shortcut",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    icon: { name: "icon", type: { kind: "scalar", name: { name: "text" } } },
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
};

type shortcut_role_table = {
  shortcut_identifier: number | null;
  role_identifier: number | null;
  identifier: number;
};
type shortcut_role_def = TableDef<
  "shortcut_role",
  {
    shortcut_identifier: FieldDef<number | null>;
    role_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const shortcut_role_def: shortcut_role_def = {
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
};

type site_table = {
  name: string;
  identifier: number;
};
type site_def = TableDef<
  "site",
  {
    name: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const site_def: site_def = {
  __meta: {
    name: "site",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type spectralink_account_table = {
  number: string;
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type spectralink_account_def = TableDef<
  "spectralink_account",
  {
    number: FieldDef<string>;
    name: FieldDef<string>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const spectralink_account_def: spectralink_account_def = {
  __meta: {
    name: "spectralink_account",
    schema: "public",
  },
  fields: {
    number: {
      name: "number",
      type: { kind: "scalar", name: { name: "text" } },
    },
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type spectralink_group_table = {
  name: string;
  cas_mode: cas_mode;
  cas_version: number;
  identifier: number;
};
type spectralink_group_def = TableDef<
  "spectralink_group",
  {
    name: FieldDef<string>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const spectralink_group_def: spectralink_group_def = {
  __meta: {
    name: "spectralink_group",
    schema: "public",
  },
  fields: {
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type spectralink_group_location_table = {
  spectralink_group_identifier: number;
  location_identifier: number;
};
type spectralink_group_location_def = TableDef<
  "spectralink_group_location",
  {
    spectralink_group_identifier: FieldDef<number>;
    location_identifier: FieldDef<number>;
  }
>;
const spectralink_group_location_def: spectralink_group_location_def = {
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
};

type spectralink_group_spectralink_account_table = {
  spectralink_group_identifier: number;
  spectralink_account_identifier: number;
};
type spectralink_group_spectralink_account_def = TableDef<
  "spectralink_group_spectralink_account",
  {
    spectralink_group_identifier: FieldDef<number>;
    spectralink_account_identifier: FieldDef<number>;
  }
>;
const spectralink_group_spectralink_account_def: spectralink_group_spectralink_account_def =
  {
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
  };

type spectralink_message_table = {
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
type spectralink_message_def = TableDef<
  "spectralink_message",
  {
    external_identifier: FieldDef<number>;
    key: FieldDef<string>;
    action: FieldDef<number | null>;
    parameters: FieldDef<any>;
    scheduled_at: FieldDef<joda.Instant>;
    sent_at: FieldDef<joda.Instant | null>;
    deleted_at: FieldDef<joda.Instant | null>;
    expired_at: FieldDef<joda.Instant>;
    account_identifier: FieldDef<number>;
    created_at: FieldDef<joda.Instant>;
    identifier: FieldDef<number>;
  }
>;
const spectralink_message_def: spectralink_message_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    deleted_at: {
      name: "deleted_at",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
};

type spectralink_message_queue_table = {
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
type spectralink_message_queue_def = TableDef<
  "spectralink_message_queue",
  {
    guid: FieldDef<string>;
    engine_event_identifier: FieldDef<number>;
    message: FieldDef<string>;
    action: FieldDef<number>;
    response: FieldDef<number>;
    color: FieldDef<number>;
    alerttone: FieldDef<number>;
    alertvolume: FieldDef<number>;
    alerttimeout: FieldDef<number>;
    callback: FieldDef<number>;
    account_identifier: FieldDef<number>;
    created_at: FieldDef<joda.Instant>;
    sent_at: FieldDef<joda.Instant | null>;
    delivered_at: FieldDef<joda.Instant | null>;
    man_ack_at: FieldDef<joda.Instant | null>;
    deleted: FieldDef<boolean>;
    deletion_sent_at: FieldDef<joda.Instant | null>;
    deletion_confirmed_at: FieldDef<joda.Instant | null>;
    identifier: FieldDef<number>;
  }
>;
const spectralink_message_queue_def: spectralink_message_queue_def = {
  __meta: {
    name: "spectralink_message_queue",
    schema: "public",
  },
  fields: {
    guid: { name: "guid", type: { kind: "scalar", name: { name: "text" } } },
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    delivered_at: {
      name: "delivered_at",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    man_ack_at: {
      name: "man_ack_at",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    deletion_confirmed_at: {
      name: "deletion_confirmed_at",
      type: {
        kind: "nullable",
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type spectralink_message_reference_table = {
  key: string;
  engine_call_action_message_identifier: number;
  context_location_identifier: number | null;
  tag: string | null;
  identifier: number;
};
type spectralink_message_reference_def = TableDef<
  "spectralink_message_reference",
  {
    key: FieldDef<string>;
    engine_call_action_message_identifier: FieldDef<number>;
    context_location_identifier: FieldDef<number | null>;
    tag: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const spectralink_message_reference_def: spectralink_message_reference_def = {
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
};

type state_cause_table = {
  type: number;
  id_lsb: number | null;
  id_msb: number | null;
  description: string;
  device_identifier: number | null;
  state_cause_template_identifier: number | null;
  identifier: number;
};
type state_cause_def = TableDef<
  "state_cause",
  {
    type: FieldDef<number>;
    id_lsb: FieldDef<number | null>;
    id_msb: FieldDef<number | null>;
    description: FieldDef<string>;
    device_identifier: FieldDef<number | null>;
    state_cause_template_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const state_cause_def: state_cause_def = {
  __meta: {
    name: "state_cause",
    schema: "public",
  },
  fields: {
    type: { name: "type", type: { kind: "scalar", name: { name: "integer" } } },
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
};

type state_cause_template_table = {
  priority: number;
  name: string;
  identifier: number;
};
type state_cause_template_def = TableDef<
  "state_cause_template",
  {
    priority: FieldDef<number>;
    name: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const state_cause_template_def: state_cause_template_def = {
  __meta: {
    name: "state_cause_template",
    schema: "public",
  },
  fields: {
    priority: {
      name: "priority",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type state_cause_template_device_table = {
  state_cause_template_identifier: number;
  device_identifier: number;
};
type state_cause_template_device_def = TableDef<
  "state_cause_template_device",
  {
    state_cause_template_identifier: FieldDef<number>;
    device_identifier: FieldDef<number>;
  }
>;
const state_cause_template_device_def: state_cause_template_device_def = {
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
};

type state_machine_change_action_config_table = {
  state_machine: number;
  state_machine_state: number;
  action_config_identifier: number;
  identifier: number;
};
type state_machine_change_action_config_def = TableDef<
  "state_machine_change_action_config",
  {
    state_machine: FieldDef<number>;
    state_machine_state: FieldDef<number>;
    action_config_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const state_machine_change_action_config_def: state_machine_change_action_config_def =
  {
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
  };

type state_machine_state_table = {
  state_machine: number;
  state: number;
  device_identifier: number | null;
  identifier: number;
};
type state_machine_state_def = TableDef<
  "state_machine_state",
  {
    state_machine: FieldDef<number>;
    state: FieldDef<number>;
    device_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const state_machine_state_def: state_machine_state_def = {
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
};

type status_table = {
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
type status_def = TableDef<
  "status",
  {
    identifier: FieldDef<number>;
    name: FieldDef<string>;
    type: FieldDef<string>;
    icon: FieldDef<string>;
    color: FieldDef<string>;
    text_color: FieldDef<string>;
    background_color: FieldDef<string>;
    pursuit_sound_repeat: FieldDef<string | null>;
    pursuit_sound_night_repeat: FieldDef<string | null>;
    pursuit_sound: FieldDef<string | null>;
    pursuit_sound_night: FieldDef<string | null>;
    priority: FieldDef<number>;
    dect_identifier: FieldDef<number>;
    app_identifier: FieldDef<number>;
    cas_mode: FieldDef<cas_mode>;
    cas_version: FieldDef<number>;
  }
>;
const status_def: status_def = {
  __meta: {
    name: "status",
    schema: "public",
  },
  fields: {
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    type: { name: "type", type: { kind: "scalar", name: { name: "text" } } },
    icon: { name: "icon", type: { kind: "scalar", name: { name: "text" } } },
    color: { name: "color", type: { kind: "scalar", name: { name: "text" } } },
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
};

type status_app_table = {
  identifier: number;
};
type status_app_def = TableDef<
  "status_app",
  {
    identifier: FieldDef<number>;
  }
>;
const status_app_def: status_app_def = {
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
};

type status_dect_table = {
  beep: number;
  type: number;
  priority: number;
  identifier: number;
};
type status_dect_def = TableDef<
  "status_dect",
  {
    beep: FieldDef<number>;
    type: FieldDef<number>;
    priority: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const status_dect_def: status_dect_def = {
  __meta: {
    name: "status_dect",
    schema: "public",
  },
  fields: {
    beep: { name: "beep", type: { kind: "scalar", name: { name: "integer" } } },
    type: { name: "type", type: { kind: "scalar", name: { name: "integer" } } },
    priority: {
      name: "priority",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type string_table = {
  value: string;
  bluetooth_device_identifier: number | null;
  identifier: number;
};
type string_def = TableDef<
  "string",
  {
    value: FieldDef<string>;
    bluetooth_device_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const string_def: string_def = {
  __meta: {
    name: "string",
    schema: "public",
  },
  fields: {
    value: { name: "value", type: { kind: "scalar", name: { name: "text" } } },
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
};

type sui_patient_info_table = {
  password: string | null;
  info_url: string | null;
  instagram_api_token: string | null;
  show_instagram_on_screensaver: boolean;
  patient_identifier: number;
  identifier: number;
};
type sui_patient_info_def = TableDef<
  "sui_patient_info",
  {
    password: FieldDef<string | null>;
    info_url: FieldDef<string | null>;
    instagram_api_token: FieldDef<string | null>;
    show_instagram_on_screensaver: FieldDef<boolean>;
    patient_identifier: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const sui_patient_info_def: sui_patient_info_def = {
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
};

type sui_status_table = {
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
type sui_status_def = TableDef<
  "sui_status",
  {
    code: FieldDef<string>;
    name: FieldDef<string>;
    linked_with_location: FieldDef<boolean>;
    read_only: FieldDef<boolean>;
    home: FieldDef<boolean>;
    last_active: FieldDef<joda.Instant>;
    patient_identifier: FieldDef<number>;
    image_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const sui_status_def: sui_status_def = {
  __meta: {
    name: "sui_status",
    schema: "public",
  },
  fields: {
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
    linked_with_location: {
      name: "linked_with_location",
      type: { kind: "scalar", name: { name: "boolean" } },
    },
    read_only: {
      name: "read_only",
      type: { kind: "scalar", name: { name: "boolean" } },
    },
    home: { name: "home", type: { kind: "scalar", name: { name: "boolean" } } },
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
};

type sui_status_trigger_table = {
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
type sui_status_trigger_def = TableDef<
  "sui_status_trigger",
  {
    created: FieldDef<joda.Instant>;
    code: FieldDef<string>;
    name: FieldDef<string>;
    active: FieldDef<boolean>;
    patient_identifier: FieldDef<number>;
    on_connected_identifier: FieldDef<number | null>;
    on_disconnected_identifier: FieldDef<number | null>;
    wifi_network_identifier: FieldDef<number | null>;
    bluetooth_device_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const sui_status_trigger_def: sui_status_trigger_def = {
  __meta: {
    name: "sui_status_trigger",
    schema: "public",
  },
  fields: {
    created: {
      name: "created",
      type: { kind: "scalar", name: { name: "timestamp with time zone" } },
    },
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type supplement_table = {
  code: string;
  description: string;
  identifier: number;
};
type supplement_def = TableDef<
  "supplement",
  {
    code: FieldDef<string>;
    description: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const supplement_def: supplement_def = {
  __meta: {
    name: "supplement",
    schema: "public",
  },
  fields: {
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
    description: {
      name: "description",
      type: { kind: "scalar", name: { name: "text" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type supplement_registration_table = {
  count: number;
  comment: string | null;
  timestamp: joda.Instant;
  supplement_identifier: number | null;
  patient_identifier: number | null;
  employee_identifier: number | null;
  identifier: number;
};
type supplement_registration_def = TableDef<
  "supplement_registration",
  {
    count: FieldDef<number>;
    comment: FieldDef<string | null>;
    timestamp: FieldDef<joda.Instant>;
    supplement_identifier: FieldDef<number | null>;
    patient_identifier: FieldDef<number | null>;
    employee_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const supplement_registration_def: supplement_registration_def = {
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
};

type task_type_table = {
  type: string;
  identifier: number;
};
type task_type_def = TableDef<
  "task_type",
  {
    type: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const task_type_def: task_type_def = {
  __meta: {
    name: "task_type",
    schema: "public",
  },
  fields: {
    type: { name: "type", type: { kind: "scalar", name: { name: "text" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type task_types_roles_table = {
  task_type_identifier: number;
  role_identifier: number;
};
type task_types_roles_def = TableDef<
  "task_types_roles",
  {
    task_type_identifier: FieldDef<number>;
    role_identifier: FieldDef<number>;
  }
>;
const task_types_roles_def: task_types_roles_def = {
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
};

type translation_table = {
  translation_key: string;
  en: string | null;
  nl: string | null;
  fr: string | null;
  ru: string | null;
  de: string | null;
  identifier: number;
};
type translation_def = TableDef<
  "translation",
  {
    translation_key: FieldDef<string>;
    en: FieldDef<string | null>;
    nl: FieldDef<string | null>;
    fr: FieldDef<string | null>;
    ru: FieldDef<string | null>;
    de: FieldDef<string | null>;
    identifier: FieldDef<number>;
  }
>;
const translation_def: translation_def = {
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
};

type trusted_device_table = {
  code: string;
  name: string;
  platform: string;
  software_version: string;
  created: joda.Instant;
  last_used: joda.Instant;
  identifier: number;
};
type trusted_device_def = TableDef<
  "trusted_device",
  {
    code: FieldDef<string>;
    name: FieldDef<string>;
    platform: FieldDef<string>;
    software_version: FieldDef<string>;
    created: FieldDef<joda.Instant>;
    last_used: FieldDef<joda.Instant>;
    identifier: FieldDef<number>;
  }
>;
const trusted_device_def: trusted_device_def = {
  __meta: {
    name: "trusted_device",
    schema: "public",
  },
  fields: {
    code: { name: "code", type: { kind: "scalar", name: { name: "text" } } },
    name: { name: "name", type: { kind: "scalar", name: { name: "text" } } },
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
};

type trusted_device_patient_table = {
  trusted_device_identifier: number;
  patient_identifier: number;
};
type trusted_device_patient_def = TableDef<
  "trusted_device_patient",
  {
    trusted_device_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
  }
>;
const trusted_device_patient_def: trusted_device_patient_def = {
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
};

type trusted_device_sui_status_table = {
  trusted_device_identifier: number;
  sui_status_identifier: number;
};
type trusted_device_sui_status_def = TableDef<
  "trusted_device_sui_status",
  {
    trusted_device_identifier: FieldDef<number>;
    sui_status_identifier: FieldDef<number>;
  }
>;
const trusted_device_sui_status_def: trusted_device_sui_status_def = {
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
};

type ui_access_table = {
  platform: string;
  view: string;
  priority: number;
  identifier: number;
};
type ui_access_def = TableDef<
  "ui_access",
  {
    platform: FieldDef<string>;
    view: FieldDef<string>;
    priority: FieldDef<number>;
    identifier: FieldDef<number>;
  }
>;
const ui_access_def: ui_access_def = {
  __meta: {
    name: "ui_access",
    schema: "public",
  },
  fields: {
    platform: {
      name: "platform",
      type: { kind: "scalar", name: { name: "text" } },
    },
    view: { name: "view", type: { kind: "scalar", name: { name: "text" } } },
    priority: {
      name: "priority",
      type: { kind: "scalar", name: { name: "integer" } },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type version_history_table = {
  installed_version: string;
  installed_on: joda.LocalDateTime | null;
  identifier: number;
};
type version_history_def = TableDef<
  "version_history",
  {
    installed_version: FieldDef<string>;
    installed_on: FieldDef<joda.LocalDateTime | null>;
    identifier: FieldDef<number>;
  }
>;
const version_history_def: version_history_def = {
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
};

type webrtc_account_table = {
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
type webrtc_account_def = TableDef<
  "webrtc_account",
  {
    type: FieldDef<string>;
    display_name: FieldDef<string>;
    number: FieldDef<string>;
    domain: FieldDef<string>;
    ws_servers: FieldDef<string>;
    authorization_user: FieldDef<string>;
    password: FieldDef<string>;
    location_identifier: FieldDef<number | null>;
    camera_identifier: FieldDef<number | null>;
    device_identifier: FieldDef<number | null>;
    employee_identifier: FieldDef<number | null>;
    patient_identifier: FieldDef<number | null>;
    identifier: FieldDef<number>;
  }
>;
const webrtc_account_def: webrtc_account_def = {
  __meta: {
    name: "webrtc_account",
    schema: "public",
  },
  fields: {
    type: { name: "type", type: { kind: "scalar", name: { name: "text" } } },
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
};

type wifi_network_table = {
  ssid: string;
  identifier: number;
};
type wifi_network_def = TableDef<
  "wifi_network",
  {
    ssid: FieldDef<string>;
    identifier: FieldDef<number>;
  }
>;
const wifi_network_def: wifi_network_def = {
  __meta: {
    name: "wifi_network",
    schema: "public",
  },
  fields: {
    ssid: { name: "ssid", type: { kind: "scalar", name: { name: "text" } } },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type work_order_table = {
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
type work_order_def = TableDef<
  "work_order",
  {
    status: FieldDef<number>;
    comment: FieldDef<string>;
    timestamp: FieldDef<joda.Instant>;
    timestamp_solved: FieldDef<joda.Instant | null>;
    possible_work_order_identifier: FieldDef<number>;
    patient_identifier: FieldDef<number>;
    employee_identifier: FieldDef<number | null>;
    mailed_at: FieldDef<joda.Instant | null>;
    identifier: FieldDef<number>;
  }
>;
const work_order_def: work_order_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

type yunction_log_table = {
  utc_timestamp: joda.Instant;
  application_name: string;
  remarks: string | null;
  details: string | null;
  sent_home_on: joda.Instant | null;
  identifier: number;
};
type yunction_log_def = TableDef<
  "yunction_log",
  {
    utc_timestamp: FieldDef<joda.Instant>;
    application_name: FieldDef<string>;
    remarks: FieldDef<string | null>;
    details: FieldDef<string | null>;
    sent_home_on: FieldDef<joda.Instant | null>;
    identifier: FieldDef<number>;
  }
>;
const yunction_log_def: yunction_log_def = {
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
        typevar: { kind: "scalar", name: { name: "timestamp with time zone" } },
      },
    },
    identifier: {
      name: "identifier",
      type: { kind: "scalar", name: { name: "integer" } },
    },
  },
};

export type MyDb = {
  access_control_access_door_group: access_control_access_door_group_table;
  access_door: access_door_table;
  access_door_access_control: access_door_access_control_table;
  access_door_access_group: access_door_access_group_table;
  access_door_door_procedure: access_door_door_procedure_table;
  access_door_group_access_group: access_door_group_access_group_table;
  access_group: access_group_table;
  access_group_badge: access_group_badge_table;
  action_config: action_config_table;
  action_config_dect_to_crews_of_location: action_config_dect_to_crews_of_location_table;
  action_config_dect_to_crews_of_location_role: action_config_dect_to_crews_of_location_role_table;
  action_config_dect_to_group: action_config_dect_to_group_table;
  action_config_dect_to_group_dect_group: action_config_dect_to_group_dect_group_table;
  action_config_spectralink_to_crews_of_location: action_config_spectralink_to_crews_of_location_table;
  action_config_spectralink_to_crews_of_location_role: action_config_spectralink_to_crews_of_location_role_table;
  action_config_spectralink_to_group: action_config_spectralink_to_group_table;
  action_config_spectralink_to_group_spectralink_group: action_config_spectralink_to_group_spectralink_group_table;
  activity: activity_table;
  address: address_table;
  administration_contact: administration_contact_table;
  allergy: allergy_table;
  api_login: api_login_table;
  api_token: api_token_table;
  app_message: app_message_table;
  application_global: application_global_table;
  application_svp: application_svp_table;
  application_svp_crews: application_svp_crews_table;
  application_svp_status: application_svp_status_table;
  appointment: appointment_table;
  badge: badge_table;
  blood_type: blood_type_table;
  bluetooth_device: bluetooth_device_table;
  broadcast_call: broadcast_call_table;
  broadcast_call_broadcast_call_group: broadcast_call_broadcast_call_group_table;
  broadcast_call_group: broadcast_call_group_table;
  broadcast_call_group_device: broadcast_call_group_device_table;
  call_reason: call_reason_table;
  call_reason_category: call_reason_category_table;
  callback_queue: callback_queue_table;
  camera: camera_table;
  care: care_table;
  care_action: care_action_table;
  care_action_signature: care_action_signature_table;
  care_session: care_session_table;
  cas_audit_log: cas_audit_log_table;
  cas_notification: cas_notification_table;
  cas_report: cas_report_table;
  cas_session: cas_session_table;
  com_port: com_port_table;
  contact: contact_table;
  contact_list: contact_list_table;
  crew: crew_table;
  crew_location: crew_location_table;
  day_night: day_night_table;
  dect_account: dect_account_table;
  dect_group: dect_group_table;
  dect_group_dect_account: dect_group_dect_account_table;
  dect_group_location: dect_group_location_table;
  dect_message: dect_message_table;
  dect_message_queue: dect_message_queue_table;
  default_text: default_text_table;
  dementia: dementia_table;
  department: department_table;
  device: device_table;
  device_status: device_status_table;
  diary: diary_table;
  diary_patient: diary_patient_table;
  diary_read: diary_read_table;
  door_procedure: door_procedure_table;
  email: email_table;
  employee: employee_table;
  employee_authorization: employee_authorization_table;
  engine_action: engine_action_table;
  engine_call: engine_call_table;
  engine_call_action: engine_call_action_table;
  engine_call_action_message: engine_call_action_message_table;
  engine_call_action_message_app: engine_call_action_message_app_table;
  engine_call_action_message_dect: engine_call_action_message_dect_table;
  engine_call_action_message_destination_dect: engine_call_action_message_destination_dect_table;
  engine_call_action_message_destination_email: engine_call_action_message_destination_email_table;
  engine_call_action_message_destination_employee: engine_call_action_message_destination_employee_table;
  engine_call_action_message_destination_employee_role: engine_call_action_message_destination_employee_role_table;
  engine_call_action_message_destination_spectralink: engine_call_action_message_destination_spectralink_table;
  engine_call_action_message_email: engine_call_action_message_email_table;
  engine_call_action_message_spectralink: engine_call_action_message_spectralink_table;
  engine_call_action_viewpoint_notification: engine_call_action_viewpoint_notification_table;
  engine_call_action_viewpoint_status: engine_call_action_viewpoint_status_table;
  engine_device_configuration_profile: engine_device_configuration_profile_table;
  engine_event: engine_event_table;
  engine_event_access_denied: engine_event_access_denied_table;
  engine_event_access_entered: engine_event_access_entered_table;
  engine_event_access_left: engine_event_access_left_table;
  engine_event_badge_provided: engine_event_badge_provided_table;
  engine_event_badge_provisioned: engine_event_badge_provisioned_table;
  engine_event_rf_module_provided: engine_event_rf_module_provided_table;
  engine_event_viewpoint_state_changed: engine_event_viewpoint_state_changed_table;
  engine_server_configuration_profile: engine_server_configuration_profile_table;
  espa_in_message: espa_in_message_table;
  fcm_account: fcm_account_table;
  flyway_schema_history: flyway_schema_history_table;
  general_practitioner: general_practitioner_table;
  gps_signal: gps_signal_table;
  heartbeat: heartbeat_table;
  hulp_call: hulp_call_table;
  image: image_table;
  lifeline_message: lifeline_message_table;
  lifeline_message_answer: lifeline_message_answer_table;
  lifeline_message_button: lifeline_message_button_table;
  locality: locality_table;
  location: location_table;
  location_call: location_call_table;
  location_call_callback: location_call_callback_table;
  location_call_employee_presence: location_call_employee_presence_table;
  location_call_patient_in_location: location_call_patient_in_location_table;
  location_call_state_change: location_call_state_change_table;
  location_gateway_device_gateway: location_gateway_device_gateway_table;
  location_patient: location_patient_table;
  log: log_table;
  log_care: log_care_table;
  log_door: log_door_table;
  log_duty: log_duty_table;
  log_employee_dect_account: log_employee_dect_account_table;
  log_employee_spectralink_account: log_employee_spectralink_account_table;
  log_engine_context_device: log_engine_context_device_table;
  log_engine_context_location: log_engine_context_location_table;
  log_engine_context_patient: log_engine_context_patient_table;
  log_location_patient: log_location_patient_table;
  log_patient_cas_mode: log_patient_cas_mode_table;
  log_status: log_status_table;
  management_account: management_account_table;
  management_account_management_site: management_account_management_site_table;
  management_department: management_department_table;
  management_device: management_device_table;
  management_device_update: management_device_update_table;
  management_room: management_room_table;
  management_server: management_server_table;
  management_site: management_site_table;
  management_site_management_server: management_site_management_server_table;
  measurement_bloodpressure: measurement_bloodpressure_table;
  measurement_bloodsample: measurement_bloodsample_table;
  measurement_glycemia: measurement_glycemia_table;
  measurement_length: measurement_length_table;
  measurement_morsefallscale: measurement_morsefallscale_table;
  measurement_oxygensaturation: measurement_oxygensaturation_table;
  measurement_pulse: measurement_pulse_table;
  measurement_signature: measurement_signature_table;
  measurement_stoolrecord: measurement_stoolrecord_table;
  measurement_temperature: measurement_temperature_table;
  measurement_urineoutput: measurement_urineoutput_table;
  measurement_visualpainscale: measurement_visualpainscale_table;
  measurement_waterlowscale: measurement_waterlowscale_table;
  measurement_weight: measurement_weight_table;
  medication: medication_table;
  medication_form: medication_form_table;
  medication_signature: medication_signature_table;
  medication_signature_detail: medication_signature_detail_table;
  medication_type: medication_type_table;
  message: message_table;
  message_images: message_images_table;
  message_read_employees: message_read_employees_table;
  message_read_patients: message_read_patients_table;
  message_to_patients: message_to_patients_table;
  message_to_roles: message_to_roles_table;
  mis_connection: mis_connection_table;
  mis_connection_care_action: mis_connection_care_action_table;
  mis_connection_care_action_signature: mis_connection_care_action_signature_table;
  mis_connection_department: mis_connection_department_table;
  mis_connection_diary: mis_connection_diary_table;
  mis_connection_employee: mis_connection_employee_table;
  mis_connection_location: mis_connection_location_table;
  mis_connection_measurement_signature: mis_connection_measurement_signature_table;
  mis_connection_medication_signature: mis_connection_medication_signature_table;
  mis_connection_medication_type: mis_connection_medication_type_table;
  mis_connection_patient: mis_connection_patient_table;
  mis_connection_planned_care_action: mis_connection_planned_care_action_table;
  mis_connection_planned_measurement: mis_connection_planned_measurement_table;
  mis_connection_planned_medication: mis_connection_planned_medication_table;
  mis_connection_section: mis_connection_section_table;
  mis_connection_site: mis_connection_site_table;
  monitor_status_device: monitor_status_device_table;
  monitor_status_server: monitor_status_server_table;
  notification: notification_table;
  organization: organization_table;
  patient: patient_table;
  patient_administration_information: patient_administration_information_table;
  patient_contact: patient_contact_table;
  patient_group: patient_group_table;
  patient_group_ui_access: patient_group_ui_access_table;
  patient_identification: patient_identification_table;
  patient_info: patient_info_table;
  patient_lifeline_message_pending: patient_lifeline_message_pending_table;
  patient_medical_information: patient_medical_information_table;
  patient_medical_information_allergies: patient_medical_information_allergies_table;
  patient_patient_group: patient_patient_group_table;
  patient_session: patient_session_table;
  patient_social_information: patient_social_information_table;
  period: period_table;
  picture: picture_table;
  planned_care_action: planned_care_action_table;
  planned_measurement: planned_measurement_table;
  planned_medication: planned_medication_table;
  planned_medication_detail: planned_medication_detail_table;
  possible_service_function: possible_service_function_table;
  possible_work_order: possible_work_order_table;
  possible_work_order_role: possible_work_order_role_table;
  possible_work_order_top: possible_work_order_top_table;
  predefined_broadcast_call: predefined_broadcast_call_table;
  process: process_table;
  process_boot_cycle: process_boot_cycle_table;
  radio: radio_table;
  remote_alarm: remote_alarm_table;
  rf_module: rf_module_table;
  rf_module_brand: rf_module_brand_table;
  rf_module_type: rf_module_type_table;
  role: role_table;
  role_status: role_status_table;
  role_ui_access: role_ui_access_table;
  roles_engine_call_action_message_destination_email: roles_engine_call_action_message_destination_email_table;
  room: room_table;
  section: section_table;
  service_function: service_function_table;
  setting: setting_table;
  shortcut: shortcut_table;
  shortcut_role: shortcut_role_table;
  site: site_table;
  spectralink_account: spectralink_account_table;
  spectralink_group: spectralink_group_table;
  spectralink_group_location: spectralink_group_location_table;
  spectralink_group_spectralink_account: spectralink_group_spectralink_account_table;
  spectralink_message: spectralink_message_table;
  spectralink_message_queue: spectralink_message_queue_table;
  spectralink_message_reference: spectralink_message_reference_table;
  state_cause: state_cause_table;
  state_cause_template: state_cause_template_table;
  state_cause_template_device: state_cause_template_device_table;
  state_machine_change_action_config: state_machine_change_action_config_table;
  state_machine_state: state_machine_state_table;
  status: status_table;
  status_app: status_app_table;
  status_dect: status_dect_table;
  string: string_table;
  sui_patient_info: sui_patient_info_table;
  sui_status: sui_status_table;
  sui_status_trigger: sui_status_trigger_table;
  supplement: supplement_table;
  supplement_registration: supplement_registration_table;
  task_type: task_type_table;
  task_types_roles: task_types_roles_table;
  translation: translation_table;
  trusted_device: trusted_device_table;
  trusted_device_patient: trusted_device_patient_table;
  trusted_device_sui_status: trusted_device_sui_status_table;
  ui_access: ui_access_table;
  version_history: version_history_table;
  webrtc_account: webrtc_account_table;
  wifi_network: wifi_network_table;
  work_order: work_order_table;
  yunction_log: yunction_log_table;
};

export const db = new DB<MyDb>({
  tables: {
    access_control_access_door_group: access_control_access_door_group_def,
    access_door: access_door_def,
    access_door_access_control: access_door_access_control_def,
    access_door_access_group: access_door_access_group_def,
    access_door_door_procedure: access_door_door_procedure_def,
    access_door_group_access_group: access_door_group_access_group_def,
    access_group: access_group_def,
    access_group_badge: access_group_badge_def,
    action_config: action_config_def,
    action_config_dect_to_crews_of_location:
      action_config_dect_to_crews_of_location_def,
    action_config_dect_to_crews_of_location_role:
      action_config_dect_to_crews_of_location_role_def,
    action_config_dect_to_group: action_config_dect_to_group_def,
    action_config_dect_to_group_dect_group:
      action_config_dect_to_group_dect_group_def,
    action_config_spectralink_to_crews_of_location:
      action_config_spectralink_to_crews_of_location_def,
    action_config_spectralink_to_crews_of_location_role:
      action_config_spectralink_to_crews_of_location_role_def,
    action_config_spectralink_to_group: action_config_spectralink_to_group_def,
    action_config_spectralink_to_group_spectralink_group:
      action_config_spectralink_to_group_spectralink_group_def,
    activity: activity_def,
    address: address_def,
    administration_contact: administration_contact_def,
    allergy: allergy_def,
    api_login: api_login_def,
    api_token: api_token_def,
    app_message: app_message_def,
    application_global: application_global_def,
    application_svp: application_svp_def,
    application_svp_crews: application_svp_crews_def,
    application_svp_status: application_svp_status_def,
    appointment: appointment_def,
    badge: badge_def,
    blood_type: blood_type_def,
    bluetooth_device: bluetooth_device_def,
    broadcast_call: broadcast_call_def,
    broadcast_call_broadcast_call_group:
      broadcast_call_broadcast_call_group_def,
    broadcast_call_group: broadcast_call_group_def,
    broadcast_call_group_device: broadcast_call_group_device_def,
    call_reason: call_reason_def,
    call_reason_category: call_reason_category_def,
    callback_queue: callback_queue_def,
    camera: camera_def,
    care: care_def,
    care_action: care_action_def,
    care_action_signature: care_action_signature_def,
    care_session: care_session_def,
    cas_audit_log: cas_audit_log_def,
    cas_notification: cas_notification_def,
    cas_report: cas_report_def,
    cas_session: cas_session_def,
    com_port: com_port_def,
    contact: contact_def,
    contact_list: contact_list_def,
    crew: crew_def,
    crew_location: crew_location_def,
    day_night: day_night_def,
    dect_account: dect_account_def,
    dect_group: dect_group_def,
    dect_group_dect_account: dect_group_dect_account_def,
    dect_group_location: dect_group_location_def,
    dect_message: dect_message_def,
    dect_message_queue: dect_message_queue_def,
    default_text: default_text_def,
    dementia: dementia_def,
    department: department_def,
    device: device_def,
    device_status: device_status_def,
    diary: diary_def,
    diary_patient: diary_patient_def,
    diary_read: diary_read_def,
    door_procedure: door_procedure_def,
    email: email_def,
    employee: employee_def,
    employee_authorization: employee_authorization_def,
    engine_action: engine_action_def,
    engine_call: engine_call_def,
    engine_call_action: engine_call_action_def,
    engine_call_action_message: engine_call_action_message_def,
    engine_call_action_message_app: engine_call_action_message_app_def,
    engine_call_action_message_dect: engine_call_action_message_dect_def,
    engine_call_action_message_destination_dect:
      engine_call_action_message_destination_dect_def,
    engine_call_action_message_destination_email:
      engine_call_action_message_destination_email_def,
    engine_call_action_message_destination_employee:
      engine_call_action_message_destination_employee_def,
    engine_call_action_message_destination_employee_role:
      engine_call_action_message_destination_employee_role_def,
    engine_call_action_message_destination_spectralink:
      engine_call_action_message_destination_spectralink_def,
    engine_call_action_message_email: engine_call_action_message_email_def,
    engine_call_action_message_spectralink:
      engine_call_action_message_spectralink_def,
    engine_call_action_viewpoint_notification:
      engine_call_action_viewpoint_notification_def,
    engine_call_action_viewpoint_status:
      engine_call_action_viewpoint_status_def,
    engine_device_configuration_profile:
      engine_device_configuration_profile_def,
    engine_event: engine_event_def,
    engine_event_access_denied: engine_event_access_denied_def,
    engine_event_access_entered: engine_event_access_entered_def,
    engine_event_access_left: engine_event_access_left_def,
    engine_event_badge_provided: engine_event_badge_provided_def,
    engine_event_badge_provisioned: engine_event_badge_provisioned_def,
    engine_event_rf_module_provided: engine_event_rf_module_provided_def,
    engine_event_viewpoint_state_changed:
      engine_event_viewpoint_state_changed_def,
    engine_server_configuration_profile:
      engine_server_configuration_profile_def,
    espa_in_message: espa_in_message_def,
    fcm_account: fcm_account_def,
    flyway_schema_history: flyway_schema_history_def,
    general_practitioner: general_practitioner_def,
    gps_signal: gps_signal_def,
    heartbeat: heartbeat_def,
    hulp_call: hulp_call_def,
    image: image_def,
    lifeline_message: lifeline_message_def,
    lifeline_message_answer: lifeline_message_answer_def,
    lifeline_message_button: lifeline_message_button_def,
    locality: locality_def,
    location: location_def,
    location_call: location_call_def,
    location_call_callback: location_call_callback_def,
    location_call_employee_presence: location_call_employee_presence_def,
    location_call_patient_in_location: location_call_patient_in_location_def,
    location_call_state_change: location_call_state_change_def,
    location_gateway_device_gateway: location_gateway_device_gateway_def,
    location_patient: location_patient_def,
    log: log_def,
    log_care: log_care_def,
    log_door: log_door_def,
    log_duty: log_duty_def,
    log_employee_dect_account: log_employee_dect_account_def,
    log_employee_spectralink_account: log_employee_spectralink_account_def,
    log_engine_context_device: log_engine_context_device_def,
    log_engine_context_location: log_engine_context_location_def,
    log_engine_context_patient: log_engine_context_patient_def,
    log_location_patient: log_location_patient_def,
    log_patient_cas_mode: log_patient_cas_mode_def,
    log_status: log_status_def,
    management_account: management_account_def,
    management_account_management_site: management_account_management_site_def,
    management_department: management_department_def,
    management_device: management_device_def,
    management_device_update: management_device_update_def,
    management_room: management_room_def,
    management_server: management_server_def,
    management_site: management_site_def,
    management_site_management_server: management_site_management_server_def,
    measurement_bloodpressure: measurement_bloodpressure_def,
    measurement_bloodsample: measurement_bloodsample_def,
    measurement_glycemia: measurement_glycemia_def,
    measurement_length: measurement_length_def,
    measurement_morsefallscale: measurement_morsefallscale_def,
    measurement_oxygensaturation: measurement_oxygensaturation_def,
    measurement_pulse: measurement_pulse_def,
    measurement_signature: measurement_signature_def,
    measurement_stoolrecord: measurement_stoolrecord_def,
    measurement_temperature: measurement_temperature_def,
    measurement_urineoutput: measurement_urineoutput_def,
    measurement_visualpainscale: measurement_visualpainscale_def,
    measurement_waterlowscale: measurement_waterlowscale_def,
    measurement_weight: measurement_weight_def,
    medication: medication_def,
    medication_form: medication_form_def,
    medication_signature: medication_signature_def,
    medication_signature_detail: medication_signature_detail_def,
    medication_type: medication_type_def,
    message: message_def,
    message_images: message_images_def,
    message_read_employees: message_read_employees_def,
    message_read_patients: message_read_patients_def,
    message_to_patients: message_to_patients_def,
    message_to_roles: message_to_roles_def,
    mis_connection: mis_connection_def,
    mis_connection_care_action: mis_connection_care_action_def,
    mis_connection_care_action_signature:
      mis_connection_care_action_signature_def,
    mis_connection_department: mis_connection_department_def,
    mis_connection_diary: mis_connection_diary_def,
    mis_connection_employee: mis_connection_employee_def,
    mis_connection_location: mis_connection_location_def,
    mis_connection_measurement_signature:
      mis_connection_measurement_signature_def,
    mis_connection_medication_signature:
      mis_connection_medication_signature_def,
    mis_connection_medication_type: mis_connection_medication_type_def,
    mis_connection_patient: mis_connection_patient_def,
    mis_connection_planned_care_action: mis_connection_planned_care_action_def,
    mis_connection_planned_measurement: mis_connection_planned_measurement_def,
    mis_connection_planned_medication: mis_connection_planned_medication_def,
    mis_connection_section: mis_connection_section_def,
    mis_connection_site: mis_connection_site_def,
    monitor_status_device: monitor_status_device_def,
    monitor_status_server: monitor_status_server_def,
    notification: notification_def,
    organization: organization_def,
    patient: patient_def,
    patient_administration_information: patient_administration_information_def,
    patient_contact: patient_contact_def,
    patient_group: patient_group_def,
    patient_group_ui_access: patient_group_ui_access_def,
    patient_identification: patient_identification_def,
    patient_info: patient_info_def,
    patient_lifeline_message_pending: patient_lifeline_message_pending_def,
    patient_medical_information: patient_medical_information_def,
    patient_medical_information_allergies:
      patient_medical_information_allergies_def,
    patient_patient_group: patient_patient_group_def,
    patient_session: patient_session_def,
    patient_social_information: patient_social_information_def,
    period: period_def,
    picture: picture_def,
    planned_care_action: planned_care_action_def,
    planned_measurement: planned_measurement_def,
    planned_medication: planned_medication_def,
    planned_medication_detail: planned_medication_detail_def,
    possible_service_function: possible_service_function_def,
    possible_work_order: possible_work_order_def,
    possible_work_order_role: possible_work_order_role_def,
    possible_work_order_top: possible_work_order_top_def,
    predefined_broadcast_call: predefined_broadcast_call_def,
    process: process_def,
    process_boot_cycle: process_boot_cycle_def,
    radio: radio_def,
    remote_alarm: remote_alarm_def,
    rf_module: rf_module_def,
    rf_module_brand: rf_module_brand_def,
    rf_module_type: rf_module_type_def,
    role: role_def,
    role_status: role_status_def,
    role_ui_access: role_ui_access_def,
    roles_engine_call_action_message_destination_email:
      roles_engine_call_action_message_destination_email_def,
    room: room_def,
    section: section_def,
    service_function: service_function_def,
    setting: setting_def,
    shortcut: shortcut_def,
    shortcut_role: shortcut_role_def,
    site: site_def,
    spectralink_account: spectralink_account_def,
    spectralink_group: spectralink_group_def,
    spectralink_group_location: spectralink_group_location_def,
    spectralink_group_spectralink_account:
      spectralink_group_spectralink_account_def,
    spectralink_message: spectralink_message_def,
    spectralink_message_queue: spectralink_message_queue_def,
    spectralink_message_reference: spectralink_message_reference_def,
    state_cause: state_cause_def,
    state_cause_template: state_cause_template_def,
    state_cause_template_device: state_cause_template_device_def,
    state_machine_change_action_config: state_machine_change_action_config_def,
    state_machine_state: state_machine_state_def,
    status: status_def,
    status_app: status_app_def,
    status_dect: status_dect_def,
    string: string_def,
    sui_patient_info: sui_patient_info_def,
    sui_status: sui_status_def,
    sui_status_trigger: sui_status_trigger_def,
    supplement: supplement_def,
    supplement_registration: supplement_registration_def,
    task_type: task_type_def,
    task_types_roles: task_types_roles_def,
    translation: translation_def,
    trusted_device: trusted_device_def,
    trusted_device_patient: trusted_device_patient_def,
    trusted_device_sui_status: trusted_device_sui_status_def,
    ui_access: ui_access_def,
    version_history: version_history_def,
    webrtc_account: webrtc_account_def,
    wifi_network: wifi_network_def,
    work_order: work_order_def,
    yunction_log: yunction_log_def,
  },
});
