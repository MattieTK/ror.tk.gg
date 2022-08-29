import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Grid, Box, Flex, Heading, Paragraph } from "theme-ui";
import ItemList from "../components/ItemList";
import useMousePosition from "../lib/useMousePosition";
import { useState } from "react";
import RarityBox from "../components/RarityBox";

export default function Home() {
  const { x, y } = useMousePosition();
  const [hoveredItem, setHoveredItem] = useState({});
  const [rarityState, setRarityState] = useState("Common");

  const HoverBox = () => {
    if (hoveredItem) {
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
            top: y + 10,
            left: x + 10,

            color: "text",
            width: "auto",
            backgroundColor: "background",
            padding: "4px",
          }}
        >
          <Box sx={{ fontSize: "22px", fontFamily: "Bombardier-Regular" }}>
            {hoveredItem.name}
          </Box>
          <Box sx={{ fontSize: "18px", maxWidth: "200px" }}>
            {hoveredItem.description}
          </Box>
        </Box>
      );
    }
    return null;
  };

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
        <RarityBox
          rarity={"Common"}
          setRarity={setRarityState}
          active={rarityState}
        />
        <RarityBox
          rarity={"Uncommon"}
          setRarity={setRarityState}
          active={rarityState}
        />
        <RarityBox
          rarity={"Legendary"}
          setRarity={setRarityState}
          active={rarityState}
        />
        <RarityBox
          rarity={"Boss"}
          setRarity={setRarityState}
          active={rarityState}
        />
        <RarityBox
          rarity={"Equipment"}
          setRarity={setRarityState}
          active={rarityState}
        />
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
          <HoverBox />

          <ItemList rarity={rarityState} setHoveredItem={setHoveredItem} />
        </Flex>
      </Flex>
    </Box>
  );
}
