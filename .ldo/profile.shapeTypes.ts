import { ShapeType } from "@ldo/ldo";
import { profileSchema } from "./profile.schema";
import { profileContext } from "./profile.context";
import {
  SolidProfileShape,
  AddressShape,
  EmailShape,
  PhoneNumberShape,
  TrustedAppShape,
  RSAPublicKeyShape,
} from "./profile.typings";

/**
 * =============================================================================
 * LDO ShapeTypes profile
 * =============================================================================
 */

/**
 * SolidProfileShape ShapeType
 */
export const SolidProfileShapeShapeType: ShapeType<SolidProfileShape> = {
  schema: profileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#SolidProfileShape",
  context: profileContext,
};

/**
 * AddressShape ShapeType
 */
export const AddressShapeShapeType: ShapeType<AddressShape> = {
  schema: profileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#AddressShape",
  context: profileContext,
};

/**
 * EmailShape ShapeType
 */
export const EmailShapeShapeType: ShapeType<EmailShape> = {
  schema: profileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#EmailShape",
  context: profileContext,
};

/**
 * PhoneNumberShape ShapeType
 */
export const PhoneNumberShapeShapeType: ShapeType<PhoneNumberShape> = {
  schema: profileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#PhoneNumberShape",
  context: profileContext,
};

/**
 * TrustedAppShape ShapeType
 */
export const TrustedAppShapeShapeType: ShapeType<TrustedAppShape> = {
  schema: profileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#TrustedAppShape",
  context: profileContext,
};

/**
 * RSAPublicKeyShape ShapeType
 */
export const RSAPublicKeyShapeShapeType: ShapeType<RSAPublicKeyShape> = {
  schema: profileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#RSAPublicKeyShape",
  context: profileContext,
};
