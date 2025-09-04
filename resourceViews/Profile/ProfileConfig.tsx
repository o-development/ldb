import { SolidProfileShapeType } from '../../.ldo/profile.shapeTypes';
import { ResourceViewConfig } from '../../components/ResourceView';
import { User } from '../../lib/icons/User';
import { ProfileView } from './ProfileView';

export const ProfileConfig: ResourceViewConfig = {
  name: 'profile',
  displayName: 'Profile',
  displayIcon: User,
  view: ProfileView,
  canDisplay: (targetUri, targetResource, dataset) => {
    const profile = dataset
      .usingType(SolidProfileShapeType)
      .fromSubject(targetUri);

    return !!profile?.type?.some?.(
      (val) => val['@id'] === 'Person' || val['@id'] === 'Person2',
    );
  },
};
