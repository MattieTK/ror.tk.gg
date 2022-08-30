import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Grid, Box, Flex, Heading, Paragraph } from "theme-ui";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/items/Common");
  });

  return null;
}
