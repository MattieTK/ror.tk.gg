import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Grid, Box, Flex, Heading, Paragraph } from "theme-ui";
import ItemList from "../components/ItemList";
import useMousePosition from "../lib/useMousePosition";
import { useEffect, useState } from "react";
import RarityBox from "../components/RarityBox";
import { useRouter } from "next/router";

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

export default function Home() {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState({});
  const [rarityState, setRarityState] = useState("Common");

  const setRarity = (rarity) => {
    router.push({ query: { rarity: rarity } }, undefined, { shallow: true });
    return;
  };

  useEffect(() => {
    if (router.query.rarity !== undefined) {
      setRarityState(router.query.rarity);
    }
  }, [router.query.rarity]);

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
          setRarity={setRarity}
          active={rarityState}
        />
        <RarityBox
          rarity={"Uncommon"}
          setRarity={setRarity}
          active={rarityState}
        />
        <RarityBox
          rarity={"Legendary"}
          setRarity={setRarity}
          active={rarityState}
        />
        <RarityBox rarity={"Boss"} setRarity={setRarity} active={rarityState} />
        <RarityBox
          rarity={"Equipment"}
          setRarity={setRarity}
          active={rarityState}
        />
        <RarityBox rarity={"Void"} setRarity={setRarity} active={rarityState} />
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

          <ItemList rarity={rarityState} setHoveredItem={setHoveredItem} />
        </Flex>
      </Flex>
    </Box>
  );
}
