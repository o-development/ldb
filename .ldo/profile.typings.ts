import { LdoJsonldContext, LdSet } from "@ldo/ldo";

/**
 * =============================================================================
 * Typescript Typings for profile
 * =============================================================================
 */

/**
 * SolidProfile Type
 */
export interface SolidProfile {
  "@id"?: string;
  "@context"?: LdoJsonldContext;
  /**
   * Defines the node as a Person (from Schema.org) | Defines the node as a Person (from foaf)
   */
  type: LdSet<
    | {
        "@id": "Person";
      }
    | {
        "@id": "Person2";
      }
  >;
  /**
   * The formatted name of a person. Example: John Smith
   */
  fn?: string;
  /**
   * An alternate way to define a person's name.
   */
  name?: string;
  /**
   * The person's street address.
   */
  hasAddress?: LdSet<Address>;
  /**
   * The person's email.
   */
  hasEmail?: LdSet<Email>;
  /**
   * A link to the person's photo
   */
  hasPhoto?: {
    "@id": string;
  };
  /**
   * Photo link but in string form
   */
  img?: string;
  /**
   * Person's telephone number
   */
  hasTelephone?: LdSet<PhoneNumber>;
  /**
   * An alternative way to define a person's telephone number using a string
   */
  phone?: string;
  /**
   * The name of the organization with which the person is affiliated
   */
  organizationName?: string;
  /**
   * The name of the person's role in their organization
   */
  role?: string;
  /**
   * A list of app origins that are trusted by this user
   */
  trustedApp?: LdSet<TrustedApp>;
  /**
   * A list of RSA public keys that are associated with private keys the user holds.
   */
  key?: LdSet<RSAPublicKey>;
  /**
   * The user's LDP inbox to which apps can post notifications
   */
  inbox: {
    "@id": string;
  };
  /**
   * The user's preferences
   */
  preferencesFile?: {
    "@id": string;
  };
  /**
   * The location of a Solid storage server related to this WebId
   */
  storage?: LdSet<{
    "@id": string;
  }>;
  /**
   * The user's account
   */
  account?: {
    "@id": string;
  };
  /**
   * A registry of all types used on the user's Pod (for private access only)
   */
  privateTypeIndex?: LdSet<{
    "@id": string;
  }>;
  /**
   * A registry of all types used on the user's Pod (for public access)
   */
  publicTypeIndex?: LdSet<{
    "@id": string;
  }>;
  /**
   * A list of WebIds for all the people this user knows.
   */
  knows?: LdSet<{
    "@id": string;
  }>;
}

/**
 * Address Type
 */
export interface Address {
  "@id"?: string;
  "@context"?: LdoJsonldContext;
  /**
   * The name of the user's country of residence
   */
  countryName?: string;
  /**
   * The name of the user's locality (City, Town etc.) of residence
   */
  locality?: string;
  /**
   * The user's postal code
   */
  postalCode?: string;
  /**
   * The name of the user's region (State, Province etc.) of residence
   */
  region?: string;
  /**
   * The user's street address
   */
  streetAddress?: string;
}

/**
 * Email Type
 */
export interface Email {
  "@id"?: string;
  "@context"?: LdoJsonldContext;
  /**
   * The type of email.
   */
  type?: LdSet<
    | {
        "@id": "Dom";
      }
    | {
        "@id": "Home";
      }
    | {
        "@id": "ISDN";
      }
    | {
        "@id": "Internet";
      }
    | {
        "@id": "Intl";
      }
    | {
        "@id": "Label";
      }
    | {
        "@id": "Parcel";
      }
    | {
        "@id": "Postal";
      }
    | {
        "@id": "Pref";
      }
    | {
        "@id": "Work";
      }
    | {
        "@id": "X400";
      }
  >;
  /**
   * The value of an email as a mailto link (Example <mailto:jane@example.com>)
   */
  value: {
    "@id": string;
  };
}

/**
 * PhoneNumber Type
 */
export interface PhoneNumber {
  "@id"?: string;
  "@context"?: LdoJsonldContext;
  /**
   * They type of Phone Number
   */
  type?: LdSet<
    | {
        "@id": "Dom";
      }
    | {
        "@id": "Home";
      }
    | {
        "@id": "ISDN";
      }
    | {
        "@id": "Internet";
      }
    | {
        "@id": "Intl";
      }
    | {
        "@id": "Label";
      }
    | {
        "@id": "Parcel";
      }
    | {
        "@id": "Postal";
      }
    | {
        "@id": "Pref";
      }
    | {
        "@id": "Work";
      }
    | {
        "@id": "X400";
      }
  >;
  /**
   * The value of a phone number as a tel link (Example <tel:555-555-5555>)
   */
  value: {
    "@id": string;
  };
}

/**
 * TrustedApp Type
 */
export interface TrustedApp {
  "@id"?: string;
  "@context"?: LdoJsonldContext;
  /**
   * The level of access provided to this origin
   */
  mode: LdSet<
    | {
        "@id": "Append";
      }
    | {
        "@id": "Control";
      }
    | {
        "@id": "Read";
      }
    | {
        "@id": "Write";
      }
  >;
  /**
   * The app origin the user trusts
   */
  origin: {
    "@id": string;
  };
}

/**
 * RSAPublicKey Type
 */
export interface RSAPublicKey {
  "@id"?: string;
  "@context"?: LdoJsonldContext;
  /**
   * RSA Modulus
   */
  modulus: string;
  /**
   * RSA Exponent
   */
  exponent: number;
}
