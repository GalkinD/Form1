import { useState } from 'react';
import FormManual from './FormManual';
import FormLibrary from './FormLibrary';

function App() {
  const [mode, setMode] = useState('manual'); // 'manual' или 'library'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          onClick={() => setMode('manual')}
          style={{ width: 'auto', marginRight: '10px', background: mode === 'manual' ? '#646cff' : '#444' }}
        >
          Вариант 1: Вручную
        </button>
        <button 
          onClick={() => setMode('library')}
          style={{ width: 'auto', background: mode === 'library' ? '#646cff' : '#444' }}
        >
          Вариант 2: RHF + Yup
        </button>
      </div>

      {mode === 'manual' ? <FormManual /> : <FormLibrary />}
    </div>
  );
}

export default App;