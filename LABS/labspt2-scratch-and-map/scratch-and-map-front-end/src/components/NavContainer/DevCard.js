import React from "react";
import { Reveal, Card, Icon, Image } from "semantic-ui-react";
import abi from "../../img/abi.png";
import ryan from "../../img/ryan.png";
import javier from "../../img/javier.png";
import brandon from "../../img/brandon.png";
import courtney from "../../img/courtney.png";
import pascale from "../../img/pascale.png";

const DevCard = () => (
  <Card.Group centered itemsPerRow="3" doubling="true">
    <Reveal animated="fade">
      <Reveal.Content visible className="devimagehide">
        <a
          href="https://github.com/AbiFranklin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={abi} size="large" />
        </a>
      </Reveal.Content>
      <Reveal.Content hidden>
        <Card>
          <Card.Content>
            <Card.Header>
              <p>Abi Franklin</p>
            </Card.Header>
            <Card.Description>
              A Full Stack Dev and member of the largest air guitar ensemble.
            </Card.Description>
            <a
              href="https://github.com/AbiFranklin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" size="large" />
            </a>
          </Card.Content>
        </Card>
      </Reveal.Content>
    </Reveal>

    <Reveal animated="fade">
      <Reveal.Content visible className="devimagehide">
        <a
          href="https://github.com/cocoitali"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={courtney} size="large" />
        </a>
      </Reveal.Content>
      <Reveal.Content hidden>
        <Card>
          <Card.Content>
            <Card.Header>
              <p>Court Buratto</p>
            </Card.Header>
            <Card.Description>
              A Full Stack Dev and aspiring downhill mountain biker.
            </Card.Description>
            <a
              href="https://github.com/cocoitali"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" size="large" />
            </a>
          </Card.Content>
        </Card>
      </Reveal.Content>
    </Reveal>

    <Reveal animated="fade">
      <Reveal.Content visible className="devimagehide">
        <a
          href="https://github.com/ryntak94"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={ryan} size="large" />
        </a>
      </Reveal.Content>
      <Reveal.Content hidden>
        <Card>
          <Card.Content>
            <Card.Header>
              <p>Ryan Matthews</p>
            </Card.Header>
            <Card.Description>
              A Full Stack Web Dev and L33T LARPer.
            </Card.Description>
            <a
              href="https://github.com/ryntak94"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" size="large" />
            </a>
          </Card.Content>
        </Card>
      </Reveal.Content>
    </Reveal>

    <Reveal animated="fade">
      <Reveal.Content visible className="devimagehide">
        <a
          href="https://github.com/jalvarez2020"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={javier} size="large" />
        </a>
      </Reveal.Content>
      <Reveal.Content hidden>
        <Card>
          <Card.Content>
            <Card.Header>
              <p>Javier Alverez</p>
            </Card.Header>
            <Card.Description>
              The Man. oh, and a Full Stack Web Developer.
            </Card.Description>
            <a
              href="https://github.com/jalvarez2020"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" size="large" />
            </a>
          </Card.Content>
        </Card>
      </Reveal.Content>
    </Reveal>

    <Reveal animated="fade">
      <Reveal.Content visible className="devimagehide">
        <a
          href="https://github.com/BrandonMoll"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={brandon} size="large" />
        </a>
      </Reveal.Content>
      <Reveal.Content hidden>
        <Card>
          <Card.Content>
            <Card.Header>
              <p>Brandon Moll</p>
            </Card.Header>
            <Card.Description>
              A Full Stack Developer and smoked meat enthusiast
            </Card.Description>
            <a
              href="https://github.com/BrandonMoll"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" size="large" />
            </a>
          </Card.Content>
        </Card>
      </Reveal.Content>
    </Reveal>

    <Reveal animated="fade">
      <Reveal.Content visible className="devimagehide">
        <a
          href="https://github.com/PSquared0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={pascale} size="large" />
        </a>
      </Reveal.Content>
      <Reveal.Content hidden>
        <Card>
          <Card.Content>
            <Card.Header>
              <p>Pascale Pierre</p>
            </Card.Header>
            <Card.Description>
              A Full Stack Dev with a black belt in graphic design.
            </Card.Description>
            <a
              href="https://github.com/PSquared0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" size="large" />
            </a>
          </Card.Content>
        </Card>
      </Reveal.Content>
    </Reveal>
  </Card.Group>
);

export default DevCard;
