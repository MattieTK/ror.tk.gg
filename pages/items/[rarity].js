import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import GitHubButton from "react-github-btn";

import styles from "../../styles/Home.module.css";
import ItemList from "../../components/ItemList";
import useMousePosition from "../../lib/useMousePosition";
import { RarityBox } from "../../components/RarityBox";
import ExpansionToggle from "../../components/ExpansionToggle";
import { container, flex, flexRow, flexColumn, flexSpaceAround, heading, paragraph, link } from "../../styles/theme.css";
import { hoverBox, hoverBoxTitle, hoverBoxDescription } from "../../styles/HoverBox.css";

const HoverBox = ({ item }) => {
  const { x, y } = useMousePosition();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!item || !isClient) {
    return null;
  }

  return (
    <div
      className={hoverBox}
      style={{
        top: y + 5,
        left: x + 5,
      }}
      onMouseEnter={e => {
        e.preventDefault();
      }}
      onMouseLeave={e => {
        e.preventDefault();
      }}
    >
      <div className={hoverBoxTitle}>
        {item.name}
      </div>
      <div className={hoverBoxDescription}>{item.description}</div>
    </div>
  );
};

export default function Rarity() {
  const { query } = useRouter();
  const [hoveredItem, setHoveredItem] = useState({});
  const [enabledExpansions, setEnabledExpansions] = useState({
    'base': true,
    'Survivors of the Void': true,
    'Seekers of the Storm': true,
  });

  return (
    <div className={`${styles.container} ${container}`}>
      <Head>
        <title>Risk of Rain - Artifact of Command</title>
        <meta
          name="description"
          content="An artifact of command simulator for Risk of Rain 2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={flex} style={{ justifyContent: "space-between", alignItems: "flex-start", width: "100%", marginBottom: "20px" }}>
        <div className={flex}>
          <RarityBox rarity={"Common"} active={query.rarity} />
          <RarityBox rarity={"Uncommon"} active={query.rarity} />
          <RarityBox rarity={"Legendary"} active={query.rarity} />
          <RarityBox rarity={"Boss"} active={query.rarity} />
          <RarityBox rarity={"Lunar"} active={query.rarity} />
          <RarityBox rarity={"Equipment"} active={query.rarity} />
          <RarityBox rarity={"Void"} active={query.rarity} />
        </div>
        <div>
          <ExpansionToggle onExpansionChange={setEnabledExpansions} />
        </div>
      </div>
      <div className={flexSpaceAround}>
        <div
          className={flexColumn}
          style={{
            alignContent: "center",
            width: "min-content",
            justifyContent: "space-around",
          }}
        >
          <h1 className={heading}>
            What is your Command?
          </h1>
          <HoverBox item={hoveredItem} />
          <div>
            <ItemList rarity={query.rarity} setHoveredItem={setHoveredItem} enabledExpansions={enabledExpansions} />
          </div>
        </div>
      </div>
      <div className={flexSpaceAround}>
        <div style={{ padding: "4px", textAlign: "center" }}>
          <p className={paragraph} style={{ marginBottom: "10px" }}>
            By{" "}
            <a
              href="https://twitter.com/MattieTK"
              className={link}
            >
              @MattieTK
            </a>{" "}
            and{" "}
            <a
              href="https://twitter.com/chrishutchinson"
              className={link}
            >
              @chrishutchinson
            </a>
          </p>

          <GitHubButton
            href="https://github.com/MattieTK/ror.tk.gg"
            data-icon="octicon-star"
            aria-label="Star MattieTK/ror.tk.gg on GitHub"
          >
            Star
          </GitHubButton>
        </div>
      </div>
    </div>
  );
}
