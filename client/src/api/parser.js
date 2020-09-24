export default class Parser {
  parseNode = (node) => {
    return {
      name: node["Node Name"].trim(),
      ip: node["IP-adrress"].trim(),
      type: node.Type.trim(),
      version: node.version.trim(),
      serial: node["Serial-nbr"].trim(),
      cpu: parseInt(node.cpu.trim()),
    };
  };
  parseInterface = (i) => {
    return {
      node: i["Switch Name"].trim(),
      ip: i.ip.trim(),
      interface: i.interface.trim(),
      state: i.state.trim(),
      Rx: parseInt(i.Rx.trim()),
      Tx: parseInt(i.Tx.trim()),
      BW: parseInt(i.BW.trim()),
      input_size: parseInt(i.Input_taille.trim()),
      output_size: parseInt(i.Output_taille.trim()),
    };
  };
  parseLoadbalancer = (f5) => {
    return {
      hostname: f5.hostname.trim(),
      ip: f5.IP.trim(),
      virtual_server: f5["Virtuel Server"].trim(),
      vs_availability: f5.VS_Availability.trim(),
      destination: f5.Destination.trim(),
      pool: f5.Pool.trim(),
      member1: f5.Member1.trim(),
      mbr1_availability: f5.Mbr1_Availability.trim(),
      node1_availability: f5.Node1_Availability.trim(),
      member2: f5.Member2.trim(),
      mbr2_availability: f5.Mbr2_Availability.trim(),
      node2_availability: f5.Node2_Availability.trim(),
    };
  };
  parseError = (err) => {
    let errorTypes = getErrorTypes(err);
    if (errorTypes.length > 0) {
      return {
        node: err.SwitchName.trim(),
        interface: err.interface.trim(),
        code: parseInt(err["Total-Error"]),
        type: errorTypes,
        sys_date: err["Sys_date"], //ErrorTypes[Math.floor(Math.random() * ErrorTypes.length)],
      };
    }
  };
  parseMany = (data, type) => {
    switch (type) {
      case "interface":
        return data.map((e) => this.parseInterface(e));
      case "node":
        return data.map((e) => this.parseNode(e));
      case "f5":
        return data.map((e) => this.parseLoadbalancer(e));
      case "error":
        return data.map((e) => this.parseError(e));
      default:
        break;
    }
  };
}

const checkErrorType = (err, type) => {
  if (err[type] !== "0" && err[type] !== "--") {
    return true;
  }
  return false;
};

const getErrorTypes = (err) => {
  let res = ErrorTypes.filter((t) => {
    return checkErrorType(err, t);
  });
  return res;
};

const ErrorTypes = [
  "Align-Err",
  "FCS-Err",
  "Xmit-Err",
  "RCV-Err",
  "UderSize",
  "OutDiscards",
];
