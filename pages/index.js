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

    setResult(
      leagues.slice(
        Math.max(0, index - 2),
        Math.min(leagues.length, index + 3)
      )
    );
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <h1>⚽ 국가별 프로축구리그 순위 조회</h1>

      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchLeague()}
        placeholder="예: 대한민국 1부 또는 38위"
        style={{
          width: "100%",
          padding: 12,
          fontSize: 16,
        }}
      />

      <button
        onClick={searchLeague}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        검색
      </button>

      <div style={{ marginTop: 20 }}>
        {result.length === 0 ? (
          keyword !== "" && <p>검색 결과가 없습니다.</p>
        ) : (
          result.map((item) => (
            <div
              key={item.rank}
              style={{
                padding: 14,
                marginBottom: 8,
                border: "1px solid #ddd",
                borderRadius: 8,
                background:
                  item.league
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                  item.rank.toString() ===
                    keyword.replace("위", "").trim()
                    ? "#c8f0c8"
                    : "white",
              }}
            >
              <strong>{item.rank}위</strong> {item.league}
            </div>
          ))
        )}
      </div>

      <div
        style={{
          marginTop: "50px",
          paddingTop: "20px",
          borderTop: "1px solid #ddd",
          color: "#555",
          fontSize: "14px",
          lineHeight: "1.8",
          whiteSpace: "pre-line",
        }}
      >
        <p>
          ■ 출처 : Opta Analyst Global League Rankings (2026년 6월 기준,
          1~300위)
        </p>

        <p>
          ■ 국가명 : 네이버 국가정보 기준 공식 명칭을 사용하였습니다.
          <br />
          아래 예시를 참고하여 왼쪽 국가명을 기입해주시면 되겠습니다.
          <br />
          예) 사이프러스 O 키프로스 X / 튀르키예 O 터키 X
          <br />
          남아프리카공화국 O 남아공 X / 아랍에미리트 O UAE X
        </p>
      </div>
    </div>
  );
}
