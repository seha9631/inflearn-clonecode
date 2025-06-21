import { useState } from 'react';

function usePanel() {
    const [activePanel, setActivePanel] = useState(null);
    const openPanel = (key) => setActivePanel(key);
    const closePanel = () => setActivePanel(null);
    return { activePanel, openPanel, closePanel };
}

export default usePanel;