import {
  EditorPage,
  SelectField,
  TemplateField,
  useActionSettings,
} from "@fluxta/sdk/ui";
import type { MuteSettings, Target, VolumeSettings } from "wave-link-protocol";
import { TargetFields } from "./TargetFields";
import { useStatus } from "./use-status";

type Props = { operation: "set-volume" | "adjust-volume" | "set-mute" };
type Settings = VolumeSettings & MuteSettings;

export function ActionEditor({ operation }: Props) {
  const { values, update, set } = useActionSettings<Settings>({
    targetKind: "channel",
    mode: "toggle",
    volumePercent: operation === "adjust-volume" ? "5" : "100",
  });
  const { data: status } = useStatus();
  const muted = operation === "set-mute";
  const relative = operation === "adjust-volume";
  let unsupported = false;
  if (status?.status === "connected") {
    const channel = status.channels.find(
      (entry) => entry.id === values.channelId,
    );
    const selected =
      values.targetKind === "mix"
        ? status.mixes.find((entry) => entry.id === values.mixId)
        : values.targetKind === "channelMix"
          ? channel?.mixes.find((entry) => entry.id === values.mixId)
          : channel;
    unsupported = selected
      ? (muted ? selected.muted : selected.volumePercent) === null
      : false;
  }
  return (
    <EditorPage>
      {status?.status !== "connected" ? (
        <p role="status">
          {status?.message ?? "Waiting for the Wave Link plugin…"}
        </p>
      ) : null}
      <TargetFields
        target={values}
        status={status}
        onChange={(target: Partial<Target>) => update(target)}
      />
      {muted ? (
        <SelectField
          label="Mode"
          value={values.mode}
          onChange={(mode) => set("mode")(mode as MuteSettings["mode"])}
          options={[
            { value: "mute", label: "Mute" },
            { value: "unmute", label: "Unmute" },
            { value: "toggle", label: "Toggle" },
          ]}
          hint="Changes only this Target's mute. Other Channel and Mix mute settings remain independent."
        />
      ) : (
        <TemplateField
          label={relative ? "Adjustment" : "Volume"}
          value={String(values.volumePercent ?? "")}
          onChange={set("volumePercent")}
          placeholder={relative ? "5" : "100"}
          hint={
            relative
              ? "Percentage points: 5 is louder, -5 is quieter. The result stays within 0–100%."
              : "Percent, from 0 to 100. Values outside the range are clamped."
          }
        />
      )}
      {unsupported ? (
        <p role="alert">
          This Wave Link version does not expose {muted ? "mute" : "volume"} for
          the selected Target.
        </p>
      ) : null}
      <p className="wave-link-hint">
        Returns success and error for later steps. Unavailable commands are not
        queued.
      </p>
    </EditorPage>
  );
}
