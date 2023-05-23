import React, { useState, ChangeEvent } from "react";
import LayoutBar from "../../components/Navigation/LayoutNavigation";

export default function ConfigAdministration() {
  return (
    <LayoutBar opcionSeleccionada="administracion">
      <div>Configuracion de administracion</div>
    </LayoutBar>
  );
}
