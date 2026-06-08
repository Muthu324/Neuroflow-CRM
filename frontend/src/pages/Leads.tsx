
import React, { useState } from "react";

import {
  Users,
  Columns,
  ListOrdered,
  Plus,
} from "lucide-react";

import type { Lead } from "../types";

import { useAppState } from "../app/providers";

import { PipelineBoard } from "../components/crm/PipelineBoard";
import { LeadTable } from "../components/crm/LeadTable";
import { LeadForm } from "../components/crm/LeadForm";
import { TimelineView } from "../components/crm/TimelineView";

import { Modal } from "../components/ui/Modal";

type ViewMode = "board" | "table";

const tabs = [
  {
    key: "board",
    label: "Board Layout",
    icon: Columns,
  },
  {
    key: "table",
    label: "List Directory",
    icon: ListOrdered,
  },
];

export const Leads: React.FC = () => {
  const { leads } = useAppState();

  /* -------------------------------- */
  /* STATE                            */
  /* -------------------------------- */

  const [viewMode, setViewMode] =
    useState<ViewMode>("board");

  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] =
    useState(false);

  /* -------------------------------- */
  /* RENDER                           */
  /* -------------------------------- */

  return (
    <div className="space-y-8 pb-10">
      {/* -------------------------------- */}
      {/* HEADER                           */}
      {/* -------------------------------- */}

      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 animate-pulse text-indigo-400" />

            <h1 className="text-xl font-black uppercase tracking-tight text-zinc-100">
              Leads Manager
            </h1>
          </div>

          <p className="text-xs text-zinc-400">
            Oversee pipeline leads,
            client relationships, and
            business opportunities
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Add Lead */}
          <button
            onClick={() =>
              setIsCreateModalOpen(true)
            }
            className="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            <Plus className="h-4 w-4" />

            Add Lead
          </button>

          {/* Tabs */}
          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              const isActive =
                viewMode === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() =>
                    setViewMode(
                      tab.key as ViewMode
                    )
                  }
                  className={
                    `flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      isActive
                        ? "border border-zinc-700/60 bg-zinc-800 text-zinc-100 shadow-md"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`
                  }
                >
                  <Icon className="h-3.5 w-3.5" />

                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* -------------------------------- */}
      {/* BOARD VIEW                       */}
      {/* -------------------------------- */}

      {viewMode === "board" && (
        <section className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Pipeline Board
            </h2>

            <span className="text-[10px] font-mono uppercase text-zinc-500">
              Interactive pipeline active
            </span>
          </div>

          <PipelineBoard
            onSelectLead={(lead: Lead) =>
              setSelectedLead(lead)
            }
          />
        </section>
      )}

      {/* -------------------------------- */}
      {/* TABLE VIEW                       */}
      {/* -------------------------------- */}

      {viewMode === "table" && (
        <section className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Leads Directory
            </h2>

            <span className="text-[10px] font-mono uppercase text-zinc-500">
              {leads.length} active records
            </span>
          </div>

          <LeadTable
            onSelectLead={(lead: Lead) =>
              setSelectedLead(lead)
            }
          />
        </section>
      )}

      {/* -------------------------------- */}
      {/* LEAD DETAILS MODAL               */}
      {/* -------------------------------- */}

      <Modal
        isOpen={!!selectedLead}
        onClose={() =>
          setSelectedLead(null)
        }
        title="CRM Lead Profile"
      >
        {selectedLead && (
          <div className="grid max-h-[80vh] grid-cols-1 gap-6 overflow-y-auto pr-1">
            <LeadForm
              lead={selectedLead}
              onSaved={() =>
                setSelectedLead(null)
              }
            />

            <TimelineView
              lead={selectedLead}
            />
          </div>
        )}
      </Modal>

      {/* -------------------------------- */}
      {/* CREATE LEAD MODAL                */}
      {/* -------------------------------- */}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() =>
          setIsCreateModalOpen(false)
        }
        title="Create New Lead"
      >
        <LeadForm
          onSaved={() =>
            setIsCreateModalOpen(false)
          }
        />
      </Modal>
    </div>
  );
};

export default Leads;