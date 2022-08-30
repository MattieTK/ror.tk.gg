import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Heading, Paragraph } from "theme-ui";

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
      onMouseEnter={(e) => {
        e.preventDefault();
      }}
      onMouseLeave={(e) => {
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
        top: y + 10,
        left: x + 10,
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

          <ItemList rarity={query.rarity} setHoveredItem={setHoveredItem} />
        </Flex>
      </Flex>
    </Box>
  );
}