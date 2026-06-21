import { useState } from "react";
import leagues from "../data/leagues.json";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);

  const searchLeague = () => {
    const searchText = keyword.replace("위", "").trim();

    const index = leagues.findIndex(
      (item) =>
        item.league.toLowerCase().includes(keyword.toLowerCase()) ||
        item.rank.toString() === searchText
    );

    if (index === -1) {
      setResult([]);
      return;
    }

    const start = Math.max(0, index - 2);
    const end = Math.min(leagues.length, index + 3);

    setResult(leagues.slice(start, end));
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>⚽ 국가별 프로축구리그 순위 조회</h1>

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchLeague();
          }
        }}
        placeholder="예: 대한민국 1부 또는 38위"
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={searchLeague}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        검색
      </button>

      <div style={{ marginTop: "20px" }}>
        {result.map((item) => (
          <div
            key={item.rank}
            style={{
              padding: "14px",
              marginBottom: "8px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background:
                item.rank.toString() === searchText ||
                item.league.toLowerCase().includes(keyword.toLowerCase())
                  ? "#c8f0c8"
                  : "white",
            }}
          >
            <strong>{item.rank}위</strong> {item.league}
          </div>
        ))}
      </div>
    </div>
  );
}
