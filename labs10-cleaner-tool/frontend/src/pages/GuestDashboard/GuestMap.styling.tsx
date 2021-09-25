import styled from '@emotion/styled';
import { Container } from '../../components/';

export const MapContainer = styled(Container)`
.container-map {
    width: 65%;
    height: 75vh;
  }
  .my-leaflet-map-container img {
    max-height: none;
  }
  .leaflet-pane {
    img {
      position: absolute;
    }
  }
`