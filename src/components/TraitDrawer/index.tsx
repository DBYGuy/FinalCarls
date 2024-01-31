import React, { useEffect, useState } from 'react';
import RectangleComponent from './RectangleComponent';
import Trait from '~/components/TraitDrawer/trait';
import TraitCategory from '~/components/TraitDrawer/trait-category';
import { useTraitTypesAndValues } from '~/hooks/useTraitTypesAndValues';

interface TraitDrawerProps {
  onTraitSelect: (traitType: string, value: string) => void;
  toggleDrawer: () => void;
}

const TraitDrawer: React.FC<TraitDrawerProps> = ({
  onTraitSelect,
  toggleDrawer,
}) => {
  const { traitTypesAndValues } = useTraitTypesAndValues(); // Use the useTraitTypesAndValues hook
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    // Initialize collapsed state for each category
    const initialCollapsedState = Object.keys(traitTypesAndValues).reduce<
      Record<string, boolean>
    >(
      (acc, traitType) => {
        acc[traitType] = true; // Initialize as true (collapsed)
        return acc;
      },
      {}, // Initial object
    );
    setCollapsedCategories(initialCollapsedState);
  }, [traitTypesAndValues]);

  const toggleCategory = (traitType: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [traitType]: !prev[traitType],
    }));
  };

  return (
    <RectangleComponent>
      <div className="flex flex-col h-full">
        <div className="overflow-auto pt-1 mt-2 h-full mb-16 animate-slideInFromLeft">
          {Object.entries(traitTypesAndValues).map(([traitType, values]) => (
            <div key={traitType}>
              <TraitCategory
                traitType={traitType}
                traitCount={values.length}
                onClick={() => toggleCategory(traitType)}
                collapsed={collapsedCategories[traitType] ?? false}
              />
              {!collapsedCategories[traitType] &&
                values.map((value) => (
                  <Trait
                    key={value}
                    value={value}
                    onSelect={() => onTraitSelect(traitType, value)}
                  />
                ))}
            </div>
          ))}
        </div>
        <div className="flex justify-center pb-2">
          <button
            onClick={toggleDrawer}
            className="rounded text-white py-2 px-4 bg-transparent border border-white"
          >
            Close
          </button>
        </div>
      </div>
    </RectangleComponent>
  );
};

export default TraitDrawer;
