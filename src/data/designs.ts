export interface SavedDesign {
  id: string;
  name: string;
  category: string;
  approvedDate: string;
  unitPrice: number;
  lastQuantity: number;
  image: string;
}

export const mockSavedDesigns: SavedDesign[] = [
  {
    id: 'des-1',
    name: 'DHS Air Marshal Service Coin',
    category: 'Challenge Coins',
    approvedDate: 'Nov 2026',
    unitPrice: 3.95,
    lastQuantity: 100,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACSSPRru1BuPyhd9-6lbGLYBzGs2P2aozr-Br9miPwcnJUSNrq0C0AKPEIdQ73E_p6PN5V3eSHkasA3PR_yW-qjEkJVHvIhJm5nx14O_6fsDAszul-2cfcbPKTsgUyI7oA0oymb6JaQqaqu5ddg2sICIejqFGMs0uJhs-2WFVUdibNmaSu82UaEPtHK8MIfBVsEaA2xp5fTQsrwzSgLOSnYPIFLnz61PH43Gxun7g',
  },
  {
    id: 'des-2',
    name: 'K9 Explosive Detection Coin',
    category: 'Challenge Coins',
    approvedDate: 'Oct 2026',
    unitPrice: 2.70,
    lastQuantity: 250,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXzO28J8fjjAiPTdmTtHU0TMQXRp3mb8FIeUvppD90cVhw6uLathbxdL6RK63bDgPTiki5tH8dgJ4dSHscYQiyA8RmuOUiE2vj1wbgduNu3Cw-Q2YPWcnsCDzCX124cBN9gEcnY32HVmVhEN2cD1YkOB1s1GfYzEBJLGrQheeOk0Ol2ioPE-YAw5NG4hJu6I6wbqe28sEJkRlXRnmAGDeu7oYY3cRKxF8-xnAOj3M',
  },
  {
    id: 'des-3',
    name: 'Sheriff Star Badge Crest',
    category: 'Law Enforcement Badges',
    approvedDate: 'Sep 2026',
    unitPrice: 18.50,
    lastQuantity: 50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnjAA2UzZ__VJkpK50wcd5YvWyzYTVzqnoa3x4hdbJ8QduiAe1b1DvQrvLAQGrPHhbXxtXT5s8sUlWMD3Ecv_dQgWCBzpVQGUUG_GHXIucufVAlU5U7EdQkAq66DiI4WUAklcnOXJxQeNgDPKQz037wvkOwH7wL-XQgg0UFU4mTXJ95svXUj1m3iJDM3VtmkJi1VGEj5ORuIUXaSdbQSPE4cJ2GW7HfJ4iNxUuiqc',
  },
];
