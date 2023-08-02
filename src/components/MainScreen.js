import React from "react";
import { useSelector } from "react-redux";
export default function MainScreen() {
  const count = useSelector((state) => state.counter.count);
  return <div>MainScreen: {count}</div>;
}
