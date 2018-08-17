function s = simpsonint(data,h);

% SIMPSONINT    Integracion por el metodo de Simpson. 
%   SIMPSONINT(DATA,H) Integra numericamente los datos en DATA considerando 
%   un incremento H. Utiliza el metodo de Simpson.
%
%   Nota: para que el resultado sea exacto la cantidad de datos DEBE SER IMPAR.

M = floor((length(data) - 1)/2);

s1=0;
s2=0;
for k=1:M,
    s1 = s1 + data(2*k);
end

for k=1:(M-1),
    s2 = s2 + data(2*k+1);
end

s = h*(data(1) + data(2*M+1) + 4*s1 + 2*s2)/3;

