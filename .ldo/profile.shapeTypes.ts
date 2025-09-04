import { ShapeType } from "@ldo/ldo";
import { profileSchema } from "./profile.schema";
import { profileContext } from "./profile.context";
import {
  SolidProfile,
  Address,
  Email,
  PhoneNumber,
  TrustedApp,
  RSAPublicKey,
} from "./profile.typings";

/**
 * =============================================================================
 * LDO ShapeTypes profile
 * =============================================================================
 */

/**
 * SolidProfile ShapeType
 */
export const SolidProfileShapeType: ShapeType<SolidProfile> = {
  schema: profileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#SolidProfileShape",
  context: profileContext,
};

/**
 * Address ShapeType
 */
export const AddressShapeType: ShapeType<Address> = {
  schema: profileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#AddressShape",
  context: profileContext,
};

/**
 * Email ShapeType
 */
export const EmailShapeType: ShapeType<Email> = {
  schema: profileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#EmailShape",
  context: profileContext,
};

/**
 * PhoneNumber ShapeType
 */
export const PhoneNumberShapeType: ShapeType<PhoneNumber> = {
  schema: profileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#PhoneNumberShape",
  context: profileContext,
};

/**
 * TrustedApp ShapeType
 */
export const TrustedAppShapeType: ShapeType<TrustedApp> = {
  schema: profileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#TrustedAppShape",
  context: profileContext,
};

/**
 * RSAPublicKey ShapeType
 */
export const RSAPublicKeyShapeType: ShapeType<RSAPublicKey> = {
  schema: profileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#RSAPublicKeyShape",
  context: profileContext,
};
