'use client';

import { useState } from 'react';

export function CSVTestComponent() {
  const [testResult, setTestResult] = useState<string>('');

  const testCSVParsing = () => {
    // Sample CSV data that matches your format
    const sampleCSV = `,,,,,,,,,,,,,,,,,,,,,,,,,,OPTIONAL,,,,,,,,,,,,,,,,,
Platform,Platform URL,Intellectual Property,Age Rating,Category,Type,Sub-Type,Title,Mint Supply,Include Serial #,Pre-Mint Count,Reserved Serial #s,Serial # Transfer Order,Purchase Currency - 1,Purchase Price - 1,And / Or,Purchase Currency - 2,Purchase Price - 2,Unlock Currency,Unlock Threshold,Media - Primary (Google URL),Media - Display (Google URL),Media - Primary (S3 bucket),Media - Display (S3 bucket),Transferabilty,P2P Sale Royalty,Description,Mint Limit / Wallet,P2P Limit / Wallet,Collection,Series,Episode,Set,Season,Level,Rank,Enhancement,Level/Rank Upgrade Type (Dynamic or Additional),Artist,Edition Type,Rarity,"Bonus Media URL (e.g., YouTube link)",Copyright,Comments
Gamisodes,https://gamisodes.com,Inspector Gadget,TV-Y7,Collectible,Trading Card,Reveal,Inspector Gadget's Classic Comeback,Open,Yes,0,None,Sequential,Free / Airdrop,-,-,-,-,Gamisodes Inspector Gadget Subscription Card - 12 Months,1,https://drive.google.com/open?id=13ulTHPAxU1mGJlQ5FEUdnfXGMEDAh1v7&usp=drive_fs,-,https://gamisodes-blockchain-assets.s3.us-west-1.amazonaws.com/1725913637405Unlock_1.png,-,Platform,5%,Stay tuned as the Gamisodes Inspector Gadget story unfolds - currently at unlock Level 1!,1,No limit,-,-,-,-,1,1,-,-,Dynamic,Bayu Sadewo,Limited,-,-,© 2024 Gamisodes & WildBrain. "Inspector Gadget (Classic)" courtesy of DHX Media (Toronto) Ltd. -FR3- Field Communication. All rights reserved.,"When a customer purchases the Gamisodes Inspector Gadget Subscription (""Access Pass"") they are also airdropped this collectible card. Based on other events - this card will be dynamically and universally upgraded. When customers are airdropped this card, they should receive whatever Level is currently unlocked. "`;

    try {
      const lines = sampleCSV.split('\n');
      let headerRowIndex = -1;
      let headers: string[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && line.includes('Platform') && line.includes('Title')) {
          headerRowIndex = i;
          headers = line.split(',').map(h => h.trim().replace(/"/g, ''));
          break;
        }
      }
      
      if (headerRowIndex === -1) {
        setTestResult('❌ Could not find valid header row');
        return;
      }
      
      const data = [];
      for (let i = headerRowIndex + 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        if (line.split(',').every(cell => cell.trim() === '')) continue;
        
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        if (values.length > 0 && values[0] && values[7]) {
          const row: Record<string, unknown> = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          data.push(row);
        }
      }
      
      setTestResult(`✅ Successfully parsed ${data.length} rows. Headers: ${headers.slice(0, 5).join(', ')}...`);
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-medium mb-4">CSV Parsing Test</h3>
      <button
        onClick={testCSVParsing}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Test CSV Parsing
      </button>
      {testResult && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <pre className="text-sm">{testResult}</pre>
        </div>
      )}
    </div>
  );
}
