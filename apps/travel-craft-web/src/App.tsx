import { useEffect, useMemo } from "react";
import { validateTrip, type Trip } from "@personal-agents/travel-craft-schema";
import tripFixture from "./fixtures/sri-lanka-jan-2027.trip.json";

function formatInr(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

function exportTripPdf(trip: Trip) {
  const previousTitle = document.title;
  document.title = `${trip.id || "travel-craft-trip"}-plan`;
  const details = Array.from(
    document.querySelectorAll<HTMLDetailsElement>("main details"),
  );
  const wasOpen = details.map((el) => el.open);
  for (const el of details) {
    el.open = true;
  }

  const restore = () => {
    document.title = previousTitle;
    details.forEach((el, i) => {
      el.open = wasOpen[i] ?? false;
    });
    window.removeEventListener("afterprint", restore);
  };

  window.addEventListener("afterprint", restore);
  window.print();
  // Fallback if afterprint does not fire (some WebViews)
  window.setTimeout(restore, 1000);
}

export function App() {
  const result = useMemo(() => validateTrip(tripFixture), []);

  if (!result.ok || !result.data) {
    return (
      <main>
        <div className="error">
          <h1>Invalid trip JSON</h1>
          <ul>
            {result.issues.map((issue) => (
              <li key={`${issue.path}:${issue.message}`}>
                <code>{issue.path}</code>: {issue.message}
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  }

  return <TripView trip={result.data} />;
}

function TripView({ trip }: { trip: Trip }) {
  useEffect(() => {
    document.title = `${trip.title} · Travel Craft`;
  }, [trip.title]);

  return (
    <main>
      <header className="hero">
        <div className="hero-top">
          <p className="brand">Travel Craft</p>
          <div className="toolbar no-print">
            <button
              type="button"
              className="btn-primary"
              onClick={() => exportTripPdf(trip)}
            >
              Export PDF
            </button>
            <p className="toolbar-hint">
              Opens print dialog — choose “Save as PDF”
            </p>
          </div>
        </div>
        <h1>{trip.title}</h1>
        <ul className="meta">
          <li>
            {trip.startDate} → {trip.endDate}
          </li>
          <li>
            {trip.travellers.adults} adults
            {trip.travellers.diet.length
              ? ` · ${trip.travellers.diet.join(", ")}`
              : ""}
          </li>
          <li>
            Budget mid {formatInr(trip.budget.midLow ?? trip.budget.totalLow)}–
            {formatInr(trip.budget.midHigh ?? trip.budget.totalHigh)}
          </li>
          <li>
            <span className="badge">{trip.status}</span>
          </li>
        </ul>
        {trip.summary ? <p className="muted">{trip.summary}</p> : null}
      </header>

      <section className="section">
        <h2>Locked decisions</h2>
        <ol>
          {trip.lockedDecisions.map((d) => (
            <li key={d.id}>
              <strong>{d.choice}</strong> — {d.impact}
            </li>
          ))}
        </ol>
      </section>

      {trip.flights ? (
        <section className="section">
          <h2>Flights — best / cheap / avoid</h2>
          {trip.flights.need ? <p className="muted">{trip.flights.need}</p> : null}
          {trip.flights.planningLock ? (
            <p>
              Planning lock:{" "}
              <strong>
                {formatInr(trip.flights.planningLock.low)}–
                {formatInr(trip.flights.planningLock.high)}
              </strong>{" "}
              <span className="badge">{trip.flights.planningLock.status}</span>
            </p>
          ) : null}
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Routing</th>
                <th>Party est.</th>
                <th>Tradeoff</th>
              </tr>
            </thead>
            <tbody>
              {(trip.flights.options ?? []).map((opt) => (
                <tr key={opt.id}>
                  <td>
                    {opt.label}
                    {opt.recommended ? (
                      <>
                        {" "}
                        <span className="badge">recommend</span>
                      </>
                    ) : null}
                  </td>
                  <td>
                    {opt.outbound}
                    {opt.inbound ? (
                      <>
                        <br />
                        Return: {opt.inbound}
                      </>
                    ) : null}
                  </td>
                  <td>
                    {opt.priceParty
                      ? `${formatInr(opt.priceParty.low)}–${formatInr(opt.priceParty.high)}`
                      : "—"}
                  </td>
                  <td>{opt.tradeoff ?? opt.why ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {trip.flights.searchUrls?.length ? (
            <p className="muted">
              Search:{" "}
              {trip.flights.searchUrls.slice(0, 3).map((url, i) => (
                <span key={url}>
                  {i > 0 ? " · " : ""}
                  <a href={url} target="_blank" rel="noreferrer">
                    link {i + 1}
                  </a>
                </span>
              ))}
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="section">
        <h2>Day by day</h2>
        <div className="grid">
          {trip.days.map((day) => (
            <article key={day.id} className="day-card">
              <h3>
                {day.date} — {day.title}
              </h3>
              <p className="muted">
                {day.weatherNote}{" "}
                <span className="badge">{day.weatherKind}</span>
              </p>
              {day.timeline ? <p>{day.timeline}</p> : null}
              <details>
                <summary>Activities, media, food</summary>
                <ul>
                  {day.activities.map((a) => (
                    <li key={a.id}>
                      {a.startTime ? `${a.startTime} · ` : ""}
                      {a.name}
                      {a.optional ? " (optional)" : ""}
                    </li>
                  ))}
                </ul>
                {day.fallback ? (
                  <p className="muted">Fallback: {day.fallback}</p>
                ) : null}
              </details>
            </article>
          ))}
        </div>
      </section>

      {trip.shopping ? (
        <section className="section">
          <h2>Things to buy (From → To)</h2>
          <p className="muted">
            From <strong>{trip.shopping.from}</strong> → To{" "}
            <strong>{trip.shopping.to}</strong>
          </p>
          <div className="grid two">
            <div>
              <h3>Worth buying</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Why</th>
                    <th>Where</th>
                    <th>Approx</th>
                  </tr>
                </thead>
                <tbody>
                  {trip.shopping.buys.map((buy) => (
                    <tr key={buy.id}>
                      <td>
                        {buy.item}
                        <br />
                        <span className="badge">{buy.reason}</span>
                      </td>
                      <td>{buy.why}</td>
                      <td>{buy.where ?? "—"}</td>
                      <td>
                        {buy.approxPrice
                          ? `${formatInr(buy.approxPrice.low)}–${formatInr(buy.approxPrice.high)}`
                          : "—"}
                        {buy.notes ? (
                          <>
                            <br />
                            <span className="muted">{buy.notes}</span>
                          </>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3>Skip / don’t bother</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Why</th>
                  </tr>
                </thead>
                <tbody>
                  {trip.shopping.skips.map((skip) => (
                    <tr key={skip.id}>
                      <td>{skip.item}</td>
                      <td>{skip.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {trip.shopping.notes ? (
            <p className="muted">{trip.shopping.notes}</p>
          ) : null}
        </section>
      ) : null}

      <div className="grid two">
        <section className="section">
          <h2>Hotels (approx)</h2>
          <table>
            <thead>
              <tr>
                <th>Base</th>
                <th>Nights</th>
                <th>Approx stay</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {trip.accommodations.map((stay) => (
                <tr key={stay.id}>
                  <td>
                    {stay.name ?? stay.base}
                    <br />
                    <span className="muted">
                      {stay.checkIn} → {stay.checkOut}
                    </span>
                  </td>
                  <td>{stay.nights}</td>
                  <td>
                    {stay.approxPriceInr
                      ? `${formatInr(stay.approxPriceInr.low)}–${formatInr(stay.approxPriceInr.high)}`
                      : stay.priceTargetUsd
                        ? `$${stay.priceTargetUsd.low}–${stay.priceTargetUsd.high}/night`
                        : "—"}
                    <br />
                    <span className="badge">
                      {stay.approxPriceInr?.status ?? stay.bookingStatus}
                    </span>
                  </td>
                  <td>
                    {stay.bookingSearchUrl ? (
                      <a
                        href={stay.bookingSearchUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Search
                      </a>
                    ) : (
                      "—"
                    )}
                    {stay.notes ? (
                      <>
                        <br />
                        <span className="muted">{stay.notes}</span>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="section">
          <h2>Budget ({trip.budget.currency})</h2>
          <table>
            <thead>
              <tr>
                <th>Line</th>
                <th>Low</th>
                <th>High</th>
              </tr>
            </thead>
            <tbody>
              {trip.budget.lines.map((line) => (
                <tr key={line.id}>
                  <td>{line.label}</td>
                  <td>{formatInr(line.amount.low)}</td>
                  <td>{formatInr(line.amount.high)}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>{formatInr(trip.budget.totalLow)}</strong>
                </td>
                <td>
                  <strong>{formatInr(trip.budget.totalHigh)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="muted">{trip.budget.notes}</p>
        </section>
      </div>

      <section className="section">
        <h2>Restaurants</h2>
        <div className="grid">
          {trip.restaurants.map((r) => (
            <div key={r.id}>
              <strong>
                {r.name}
                {r.preferred ? " · preferred" : ""}
              </strong>{" "}
              <span className="muted">({r.city})</span>
              <p>
                Good: {r.good.join("; ") || "—"}
                <br />
                Caution: {r.caution.join("; ") || "—"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>YouTube / media</h2>
        <ul>
          {trip.attractions
            .filter((a) => a.youtube)
            .map((a) => (
              <li key={a.id}>
                {a.name}:{" "}
                {a.youtube?.url ? (
                  <a href={a.youtube.url} target="_blank" rel="noreferrer">
                    {a.youtube.title ?? a.youtube.url}
                  </a>
                ) : (
                  <span className="muted">
                    unavailable{a.youtube?.notes ? ` — ${a.youtube.notes}` : ""}
                  </span>
                )}
              </li>
            ))}
        </ul>
        <p className="muted">
          Map coordinates not included in this fixture — locations shown as text
          only.
        </p>
      </section>
    </main>
  );
}
