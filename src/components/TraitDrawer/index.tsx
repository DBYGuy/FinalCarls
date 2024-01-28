import React, { useEffect, useState } from 'react';
import RectangleComponent from './RectangleComponent';
import Trait from '~/components/TraitDrawer/trait';
import TraitCategory from '~/components/TraitDrawer/trait-category';

interface TraitDrawerProps {
  traitTypesAndValues: Record<string, string[]>;
  onTraitSelect: (traitType: string, value: string) => void;
}

const TraitDrawer: React.FC<TraitDrawerProps> = ({
  traitTypesAndValues,
  onTraitSelect,
}) => {
  // Define the type for collapsedCategories state
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
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
      <div className="overflow-auto h-full">
        {Object.entries(traitTypesAndValues).map(([traitType, values]) => (
          <div key={traitType}>
            <TraitCategory
              traitType={traitType}
              traitCount={values.length}
              onClick={() => toggleCategory(traitType)}
              collapsed={collapsedCategories[traitType] ?? false} // Use nullish coalescing to ensure a boolean value
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
    </RectangleComponent>
  );
};

export default TraitDrawer;
