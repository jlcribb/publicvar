import React, { useEffect, useRef } from 'react';
import { DefaultPluginSpec } from 'molstar/lib/mol-plugin/spec';
import { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context';
import { createPluginUI } from 'molstar/lib/mol-plugin-ui';

const MolstarViewer = ({ pdbId }) => {
  const viewerRef = useRef();

  useEffect(() => {
    const initPlugin = async () => {
      const canvas = viewerRef.current;
      const plugin = await createPluginUI(canvas, {
        ...DefaultPluginSpec(),
        layout: {
          initial: {
            isExpanded: false,
            showControls: true,
          },
        },
      });

      await plugin.dataTransaction(async () => {
        const data = await plugin.builders.data.download({ url: `https://files.rcsb.org/view/${pdbId}.pdb`, isBinary: false });
        const pdb = await plugin.builders.structure.parsePdb(data);
        await plugin.builders.structure.hierarchy.applyPreset(pdb, 'default');
      });
    };

    initPlugin();
  }, [pdbId]);

  return <div ref={viewerRef} style={{ width: '100%', height: '600px' }}></div>;
};

export default MolstarViewer;
