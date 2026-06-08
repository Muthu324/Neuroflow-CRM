
import React, {
  useEffect,
  useState,
} from "react";

import type { Lead } from "../../types";

import { useAppState } from "../../app/providers";

import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Badge } from "../ui/Badge";

import { formatCurrency } from "../../utils/formatCurrency";

import {
  Check,
  FilePlus,
} from "lucide-react";

interface LeadFormProps {
  lead?: Lead;
  onSaved?: () => void;
}

type TimelineEventType =
  | "note_added"
  | "reply_received"
  | "call_booked"
  | "proposal_sent";

export const LeadForm: React.FC<
  LeadFormProps
> = ({ lead, onSaved }) => {
  const {
    updateLead,
    addLead,
    addLeadTimelineEvent,
    addXP,
  } = useAppState();

  /* -------------------------------- */
  /* FORM STATE                       */
  /* -------------------------------- */

  const [name, setName] = useState(
    lead?.name || ""
  );

  const [company, setCompany] =
    useState(lead?.company || "");

  const [platform, setPlatform] =
    useState(
      lead?.platform || "linkedin"
    );

  const [niche, setNiche] =
    useState(lead?.niche || "");

  const [notes, setNotes] =
    useState(lead?.notes || "");

  const [probability, setProbability] =
    useState(
      lead?.probability || 50
    );

  const [temperature, setTemperature] =
    useState<
      Lead["temperature"]
    >(
      lead?.temperature || "warm"
    );

  const [timelineDesc, setTimelineDesc] =
    useState("");

  const [eventType, setEventType] =
    useState<TimelineEventType>(
      "note_added"
    );

  const [loading, setLoading] =
    useState(false);

  /* -------------------------------- */
  /* SYNC EXISTING LEAD               */
  /* -------------------------------- */

  useEffect(() => {
    if (!lead) return;

    setName(lead.name || "");
    setCompany(lead.company || "");
    setPlatform(
      lead.platform || "linkedin"
    );
    setNiche(lead.niche || "");
    setNotes(lead.notes || "");
    setProbability(
      lead.probability || 50
    );
    setTemperature(
      lead.temperature || "warm"
    );
  }, [lead]);

  /* -------------------------------- */
  /* SAVE LEAD                        */
  /* -------------------------------- */

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name,
        company,
        platform,
        niche,
        notes,
        probability,
        temperature,
      };

      /* UPDATE */
      if (lead) {
        updateLead(lead.id, payload);

        addXP(40);
      }

      /* CREATE */
      else {
        addLead({
          ...payload,
          revenueEstimate: 0,
        });

        addXP(80);
      }

      onSaved?.();
    } catch (error) {
      console.error(
        "Failed to save lead:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------------- */
  /* ADD TIMELINE EVENT               */
  /* -------------------------------- */

  async function publishTimelineLog(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!lead) return;

    if (!timelineDesc.trim()) return;

    addLeadTimelineEvent(
      lead.id,
      eventType,
      timelineDesc
    );

    addXP(100);

    setTimelineDesc("");
  }

  /* -------------------------------- */
  /* UI                               */
  /* -------------------------------- */

  return (
    <Card className="space-y-6 border-zinc-900 bg-zinc-950/40 p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-zinc-900 pb-4">
        <div>
          <h4 className="text-md font-bold text-zinc-100">
            {lead
              ? lead.name
              : "Create New Lead"}
          </h4>

          <span className="mt-1 block text-xs uppercase text-zinc-500">
            {lead?.company ||
              "New CRM profile"}
          </span>
        </div>

        {lead && (
          <Badge
            variant={
              lead.platform ===
              "linkedin"
                ? "linkedin"
                : "instagram"
            }
            className="text-[10px]"
          >
            {lead.niche}
          </Badge>
        )}
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Name */}
        <Input
          placeholder="Lead Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        {/* Company */}
        <Input
          placeholder="Company"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
        />

        {/* Niche */}
        <Input
          placeholder="Niche"
          value={niche}
          onChange={(e) =>
            setNiche(e.target.value)
          }
        />

        {/* Platform */}
        <select
          value={platform}
          onChange={(e) =>
            setPlatform(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-zinc-850 bg-zinc-900 p-3 text-sm text-zinc-200"
        >
          <option value="linkedin">
            LinkedIn
          </option>

          <option value="instagram">
            Instagram
          </option>
        </select>

        {/* Temperature */}
        <select
          value={temperature}
          onChange={(e) =>
            setTemperature(
              e.target.value as Lead["temperature"]
            )
          }
          className="w-full rounded-lg border border-zinc-850 bg-zinc-900 p-3 text-sm text-zinc-200"
        >
          <option value="hot">
            Hot Lead
          </option>

          <option value="warm">
            Warm Lead
          </option>

          <option value="cold">
            Cold Lead
          </option>

          <option value="ghosted">
            Ghosted
          </option>
        </select>

        {/* Probability */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">
              Closing Probability
            </span>

            <span className="font-mono text-indigo-400">
              {probability}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={probability}
            onChange={(e) =>
              setProbability(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full accent-indigo-500"
          />
        </div>

        {/* Notes */}
        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          placeholder="Lead notes..."
          className="h-24 w-full rounded-lg border border-zinc-850 bg-zinc-900 p-3 text-sm text-zinc-200"
        />

        {/* Revenue */}
        {lead && (
          <div className="rounded-lg border border-zinc-900 bg-zinc-900 p-3 text-sm">
            <span className="text-zinc-400">
              Revenue Estimate:
            </span>

            <span className="ml-2 font-bold text-indigo-400">
              {formatCurrency(
                lead.revenueEstimate
              )}
            </span>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
        >
          <Check className="mr-1.5 h-4 w-4" />

          {loading
            ? "Saving..."
            : lead
            ? "Update Lead"
            : "Create Lead"}
        </Button>
      </form>

      {/* Timeline Section */}
      {lead && (
        <div className="space-y-4 border-t border-zinc-900 pt-5">
          <h5 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Append Contact Logs
          </h5>

          <form
            onSubmit={
              publishTimelineLog
            }
            className="space-y-3"
          >
            <select
              value={eventType}
              onChange={(e) =>
                setEventType(
                  e.target
                    .value as TimelineEventType
                )
              }
              className="w-full rounded-lg border border-zinc-850 bg-zinc-900 p-2 text-xs text-zinc-300"
            >
              <option value="note_added">
                Meeting Log
              </option>

              <option value="reply_received">
                DM Reply
              </option>

              <option value="call_booked">
                Call Booked
              </option>

              <option value="proposal_sent">
                Proposal Sent
              </option>
            </select>

            <Input
              placeholder="Add interaction log..."
              value={timelineDesc}
              onChange={(e) =>
                setTimelineDesc(
                  e.target.value
                )
              }
              required
            />

            <Button
              type="submit"
              variant="secondary"
              fullWidth
            >
              <FilePlus className="mr-1.5 h-4 w-4" />

              Add Timeline Log
            </Button>
          </form>
        </div>
      )}
    </Card>
  );
};

export default LeadForm;
