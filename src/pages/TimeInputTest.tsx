import { useState } from 'react';

const SkillCheckboxes = () => {
  const [checkedSkills, setCheckedSkills] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const skillId = event.target.id;
    if (event.target.checked) {
      setCheckedSkills([...checkedSkills, skillId]);
    } else {
      setCheckedSkills(checkedSkills.filter((id) => id !== skillId));
    }
  };

  const skills = ['skill1', 'skill2', 'skill3'];

  return (
    <div className="skills">
      {skills.map((skill, index) => (
        <div key={index} className="skill">
          <input
            id={`${index + 1}`}
            type="checkbox"
            className="checkbox"
            checked={checkedSkills.includes(`${index + 1}`)}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`${index + 1}`}>{skill}</label>
        </div>
      ))}
    </div>
  );
};

export default SkillCheckboxes;
