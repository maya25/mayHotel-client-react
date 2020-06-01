import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Clear } from '@material-ui/icons';
import styled from "styled-components";

const CardWrapper = styled.div`
  position:fixed;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  z-index:1000;
  direction: rtl;
`;

const QRcodeCard = ({ qrcode, name, onCancel }) => {
  return (
    <CardWrapper>
      <Card >
        <Clear onClick={onCancel} />
        <CardActionArea style={{ maxWidth: 450, textAlign: "center" }}>
          <CardMedia style={{ height: 250, width: 250 }}
            image={qrcode}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </CardWrapper>
  );
}

export default QRcodeCard;