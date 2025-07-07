"use client";

import React from "react";
import { Calendar } from "antd";

const CalendarPopover = () => (
  <div style={{ width: 300, border: "1px solid #f0f0f0", borderRadius: 8 }}>
    <Calendar fullscreen={false} />
  </div>
);

export default CalendarPopover;
