import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chart from '../customer/Chart';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export default function AnalyticsReport() {
  return (
    <Root>
      <Divider class="text-2xl">Response Times</Divider>
      <Chart /> {/* Display Chart component after the first Divider */}
      <Divider class="text-2xl">Service Completion Rates</Divider>
      <Chart /> {/* Display Chart component after the second Divider */}
      <Divider class="text-2xl">Customer Satisfaction</Divider>
      <Chart /> {/* Display Chart component after the third Divider */}
    </Root>
  );
}
