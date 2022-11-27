import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

function SkeletonItem(props) {
  return (
    <Card sx={{ maxWidth: 300, maxHeight: 395, marginBottom: '30px'}}>
        <CardHeader
        subheader={
            <Skeleton sx={{ height: 252, width: 270 }} animation="wave" variant="rectangular" />}
        />
      {<CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
      </CardContent> }
    </Card>
  );
}
export default SkeletonItem