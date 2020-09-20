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
  parseMany = (data, type) => {
    switch (type) {
      case "interface":
        return data.map((e) => this.parseInterface(e));
      case "node":
        return data.map((e) => this.parseNode(e));
      case "f5":
        return data.map((e) => this.parseLoadbalancer(e));
      default:
        break;
    }
  };
}
