import {
  Button,
  ListRow,
  PluginEditorLayout,
  Section,
  StatusBadge,
} from "@fluxta/sdk/ui";
import type { LevelState } from "wave-link-protocol";
import { useStatus } from "./use-status";

function levelLabel(value: LevelState): string {
  return `${value.volumePercent === null ? "Volume unavailable" : `${Math.round(value.volumePercent * 100) / 100}%`} · ${value.muted === null ? "Mute unavailable" : value.muted ? "Muted" : "Unmuted"}`;
}

export function PluginEditor() {
  const { data: status, loading, refresh } = useStatus();
  return (
    <PluginEditorLayout
      title="Wave Link"
      sections={[
        {
          id: "status",
          label: "Wave Link",
          content: (
            <>
              <Section
                title="Connection"
                description="Controls Wave Link 3 on this computer. Reconnects automatically when Wave Link starts."
              >
                <ListRow
                  title="Local Wave Link"
                  description={status?.message ?? "Waiting for the plugin…"}
                  badges={
                    <StatusBadge
                      tone={
                        status?.status === "connected"
                          ? "ok"
                          : status?.status === "error"
                            ? "error"
                            : "pending"
                      }
                    >
                      {status?.status === "connected"
                        ? "Connected"
                        : status?.status === "error"
                          ? "Unavailable"
                          : "Connecting…"}
                    </StatusBadge>
                  }
                  actions={
                    <Button variant="outline" onClick={refresh}>
                      {loading ? "Waiting…" : "Refresh"}
                    </Button>
                  }
                />
                {status?.lastError ? (
                  <p role="alert">Last Action error: {status.lastError}</p>
                ) : null}
              </Section>
              <Section
                title="Channels"
                description="Use Actions to control a Channel overall or its contribution to a selected Mix."
              >
                {status?.channels.length ? (
                  status.channels.map((channel) => (
                    <ListRow
                      key={channel.id}
                      title={channel.name}
                      description={levelLabel(channel)}
                      detail={
                        <ul className="wave-link-mixes">
                          {channel.mixes.map((mix) => (
                            <li key={mix.id}>
                              {status.mixes.find((entry) => entry.id === mix.id)
                                ?.name ?? mix.id}
                              : {levelLabel(mix)}
                            </li>
                          ))}
                        </ul>
                      }
                    />
                  ))
                ) : (
                  <p>
                    No Channels available. Start Wave Link and check the
                    connection above.
                  </p>
                )}
              </Section>
              <Section
                title="Mixes"
                description="These are each Mix's overall settings. Other mute settings can also affect what you hear."
              >
                {status?.mixes.length ? (
                  status.mixes.map((mix) => (
                    <ListRow
                      key={mix.id}
                      title={mix.name}
                      description={levelLabel(mix)}
                    />
                  ))
                ) : (
                  <p>No Mixes available.</p>
                )}
              </Section>
            </>
          ),
        },
      ]}
    />
  );
}
