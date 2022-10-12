import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Heading, Paragraph, Link } from "theme-ui";
import GitHubButton from "react-github-btn";

import styles from "../../styles/Home.module.css";
import ItemList from "../../components/ItemList";
import useMousePosition from "../../lib/useMousePosition";
import { RarityBox } from "../../components/RarityBox";

const HoverBox = ({ item }) => {
  const { x, y } = useMousePosition();

  if (!item) {
    return null;
  }

  return (
    <Box
      onMouseEnter={e => {
        e.preventDefault();
      }}
      onMouseLeave={e => {
        e.preventDefault();
      }}
      sx={{
        position: "absolute",
        color: "text",
        width: "auto",
        backgroundColor: "background",
        padding: "4px",
      }}
      style={{
        top: y + 5,
        left: x + 5,
      }}
    >
      <Box sx={{ fontSize: "22px", fontFamily: "Bombardier-Regular" }}>
        {item.name}
      </Box>
      <Box sx={{ fontSize: "18px", maxWidth: "200px" }}>{item.description}</Box>
    </Box>
  );
};

export default function Rarity() {
  const { query } = useRouter();
  const [hoveredItem, setHoveredItem] = useState({});

  return (
    <Box className={styles.container} sx={{ background: "#161d1d" }}>
      <Head>
        <title>Risk of Rain - Artifact of Command</title>
        <meta
          name="description"
          content="An artifact of command simulator for Risk of Rain 2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex>
        <RarityBox rarity={"Common"} active={query.rarity} />
        <RarityBox rarity={"Uncommon"} active={query.rarity} />
        <RarityBox rarity={"Legendary"} active={query.rarity} />
        <RarityBox rarity={"Boss"} active={query.rarity} />
        <RarityBox rarity={"Lunar"} active={query.rarity} />
        <RarityBox rarity={"Equipment"} active={query.rarity} />
        <RarityBox rarity={"Void"} active={query.rarity} />
      </Flex>
      <Flex sx={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Flex
          sx={{
            alignContent: "center",
            width: "min-content",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <Heading
            as="h1"
            sx={{
              textAlign: "center",
              fontStyle: "italic",
              fontFamily: "Bombardier-Regular",
              padding: "2",
              letterSpacing: "1px",
            }}
          >
            What is your Command?
          </Heading>
          <HoverBox item={hoveredItem} />
          <Box>
            <ItemList rarity={query.rarity} setHoveredItem={setHoveredItem} />
          </Box>
        </Flex>
      </Flex>
      <Flex sx={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Box style={{ padding: "4px", textAlign: "center" }}>
          <Paragraph style={{ marginBottom: "10px" }}>
            By{" "}
            <Link
              href="https://twitter.com/MattieTK"
              style={{ textDecoration: "underline" }}
            >
              @MattieTK.
            </Link>
          </Paragraph>

          <GitHubButton
            href="https://github.com/MattieTK/ror.tk.gg"
            data-icon="octicon-star"
            aria-label="Star MattieTK/ror.tk.gg on GitHub"
          >
            Star
          </GitHubButton>
        </Box>
      </Flex>
    </Box>
  );
}
