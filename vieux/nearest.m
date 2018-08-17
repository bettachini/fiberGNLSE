function [idx, closest]= nearest(vector, value)
    tmp = abs(vector- value);
    [idx idx] = min(tmp); %index of closest value
    closest = vector(idx); %closest value
end
