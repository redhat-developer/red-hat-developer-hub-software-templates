import React from 'react';

import { SidebarItem } from '@backstage/core-components';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { IconComponent } from '@backstage/core-plugin-api';


export const ExampleComponentIcon = () => {

  return (
    <SidebarItem text="${{values.plugin_id}}" to="/${{values.plugin_id}}" icon={PermIdentityOutlinedIcon as IconComponent} />
  );
};
