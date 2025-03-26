import { LEDData, Datasheet } from '@/lib/supabase';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ComparisonViewProps {
  items: (LEDData & { datasheet: Datasheet })[];
  onClose: (uuid: string) => void;
}

export default function ComparisonView({ items, onClose }: ComparisonViewProps) {
  if (items.length === 0) return null;

  const specs = [
    { label: 'Peak Wavelength', key: 'peak_wavelength_nm' },
    { label: 'Package Type', key: 'packaging_type' },
    { label: 'Viewing Angle', key: 'viewing_angle', unit: '°' },
    { label: 'Forward Voltage (typ)', key: 'forward_voltage_typ_v', unit: 'V' },
    { label: 'Forward Current (typ)', key: 'dc_forward_current_typ_ma', unit: 'mA' },
    { label: 'Radiant Power Range', key: 'radiant_power_range' },
    { label: 'Main Description', key: 'main_spec_description' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Compare Selected LEDs</h2>
          <button
            onClick={() => items.forEach(item => onClose(item.uuid_part_number))}
            className="text-gray-600 hover:text-gray-800"
          >
            Clear All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr>
                <th className="p-2 text-left bg-gray-50 sticky left-0 z-10">Specification</th>
                {items.map((item) => (
                  <th key={item.uuid_part_number} className="p-2 min-w-[200px]">
                    <div className="flex justify-between items-center">
                      <span>{item.uuid_part_number}</span>
                      <button
                        onClick={() => onClose(item.uuid_part_number)}
                        className="text-gray-400 hover:text-gray-600"
                        title={`Remove ${item.uuid_part_number} from comparison`}
                        aria-label={`Remove ${item.uuid_part_number} from comparison`}
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map(({ label, key, unit }) => (
                <tr key={key} className="border-t border-gray-100">
                  <td className="p-2 font-medium bg-gray-50 sticky left-0">{label}</td>
                  {items.map((item) => (
                    <td key={item.uuid_part_number} className="p-2">
                      {unit
                        ? `${item[key as keyof LEDData]}${unit}`
                        : item[key as keyof LEDData]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-gray-100">
                <td className="p-2 font-medium bg-gray-50 sticky left-0">Datasheet</td>
                {items.map((item) => (
                  <td key={item.uuid_part_number} className="p-2">
                    {item.datasheet && (
                      <a
                        href={item.datasheet.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Download PDF
                      </a>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 