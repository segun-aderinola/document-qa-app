export const generateMockAnswer = (question: string): string => {
  const keywords = question
    .toLowerCase()
    .split(' ')
    .filter(
      word =>
        word.length > 3 &&
        ![
          'what',
          'how',
          'when',
          'where',
          'why',
          'which',
          'that',
          'this',
          'with',
          'from',
          'they',
          'have',
          'been',
          'will',
          'can',
          'could',
          'would',
          'should',
        ].includes(word)
    )
    .slice(0, 3);

  const templates = [
    {
      pattern: /how|guide|steps|process/i,
      response: (kw: string[]) => `# Step-by-Step Guide
  
  Based on your question about ${kw.join(', ')}, here's a comprehensive approach:
  
  ## Overview
  This process involves several key components that work together to achieve the desired outcome. The main focus areas include ${kw.join(', ')} and their interconnected relationships.
  
  ## Implementation Steps
  
  • **Phase 1**: Initial assessment and planning
  • **Phase 2**: Core implementation focusing on ${kw[0] || 'primary objectives'}
  • **Phase 3**: Testing and validation
  • **Phase 4**: Deployment and monitoring
  
  ## Key Considerations
  
  The most important factors to consider are performance, scalability, and maintainability. Special attention should be paid to ${kw[1] || 'secondary requirements'} during the implementation phase.
  
  ## Next Steps
  
  1. Review the current state and requirements
  2. Plan the implementation timeline
  3. Execute the steps systematically
  4. Monitor and adjust as needed`,
    },
    {
      pattern: /what|define|explain|meaning/i,
      response: (kw: string[]) => `# Understanding ${kw[0] || 'the Concept'}
  
  ## Definition
  ${kw[0] || 'This concept'} refers to a comprehensive framework that encompasses multiple aspects of ${kw.join(', ')}. It's essential to understand both the theoretical foundations and practical applications.
  
  ## Key Components
  
  • **Core Elements**: The fundamental building blocks include ${kw[0] || 'primary components'}
  • **Supporting Systems**: Secondary elements that enhance functionality
  • **Integration Points**: How different parts connect and interact
  
  ## Practical Applications
  
  In real-world scenarios, ${kw[0] || 'this approach'} is commonly used for:
  
  - Streamlining processes and workflows
  - Improving efficiency and performance
  - Ensuring consistency across different systems
  - Managing complexity in large-scale implementations
  
  ## Benefits and Advantages
  
  The primary advantages include enhanced ${kw[1] || 'performance'}, improved ${kw[2] || 'reliability'}, and better overall system integration.`,
    },
    {
      pattern: /why|reason|cause|benefit/i,
      response: (kw: string[]) => `# Why ${kw[0] || 'This Approach'} Matters
  
  ## Primary Reasons
  
  The main drivers behind ${kw[0] || 'this approach'} stem from several key factors:
  
  ### Business Impact
  Organizations benefit significantly from implementing ${kw[0] || 'these solutions'} because they address core operational challenges and improve overall efficiency.
  
  ### Technical Advantages
  From a technical perspective, ${kw.join(', ')} provide:
  
  • **Scalability**: Ability to grow with organizational needs
  • **Reliability**: Consistent performance under various conditions
  • **Maintainability**: Easier to update and modify over time
  
  ## Long-term Benefits
  
  The strategic advantages include reduced operational costs, improved user satisfaction, and better alignment with business objectives.
  
  ## Risk Mitigation
  
  By focusing on ${kw[1] || 'key areas'}, organizations can minimize potential issues and ensure more predictable outcomes.`,
    },
  ];

  // Find matching template or use default
  const matchedTemplate = templates.find(t => t.pattern.test(question)) || {
    response: (kw: string[]) => `# Analysis of Your Question
  
  ## Overview
  Your inquiry about ${kw.join(', ')} touches on several important aspects that deserve careful consideration.
  
  ## Key Points
  
  • **Primary Focus**: The main area of interest appears to be ${kw[0] || 'the core concept'}
  • **Related Factors**: Additional considerations include ${kw[1] || 'supporting elements'}
  • **Implementation**: Practical aspects involve ${kw[2] || 'execution strategies'}
  
  ## Detailed Explanation
  
  Based on the context of your question, the most relevant information includes both theoretical background and practical applications. The relationship between ${kw.join(' and ')} is particularly important for understanding the complete picture.
  
  ## Recommendations
  
  For optimal results, consider:
  
  1. Thorough planning and preparation
  2. Systematic implementation approach
  3. Regular monitoring and adjustment
  4. Continuous improvement processes
  
  ## Additional Resources
  
  Further exploration of ${kw[0] || 'this topic'} would benefit from examining related case studies and best practices in similar scenarios.`,
  };

  return matchedTemplate.response(keywords);
};
