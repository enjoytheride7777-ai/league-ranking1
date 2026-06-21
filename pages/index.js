
import { useState } from "react";
import leagues from "../data/leagues.json";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);

const index = leagues.findIndex(item =>
  item.league.toLowerCase().includes(keyword.toLowerCase()) ||
  item.rank.toString() === keyword.replace("위", "").trim()
);

    if (index === -1) {
      setResult([]);
      return;
    }

    setResult(
      leagues.slice(
        Math.max(0, index - 2),
        Math.min(leagues.length, index + 3)
      )
    );
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>⚽ 국가별 프로축구리그 순위 조회</h1>

      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchLeague()}
        placeholder="예: 대한민국 1부"
        style={{ width: "100%", padding: 12, fontSize: 16 }}
      />

      <button onClick={searchLeague} style={{ marginTop: 10, padding: "10px 20px" }}>
        검색
      </button>

      <div style={{ marginTop: 20 }}>
        {result.map((item) => (
          <div
            key={item.rank}
            style={{
              padding: 14,
              marginBottom: 8,
              border: "1px solid #ddd",
              borderRadius: 8,
              background: item.league.toLowerCase().includes(keyword.toLowerCase())
                ? "#c8f0c8"
                : "white"
            }}
          >
            <strong>{item.rank}위</strong> {item.league}
          </div>
        ))}
      </div>
    </div>
  );
}
